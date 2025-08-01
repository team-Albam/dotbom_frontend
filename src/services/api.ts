export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

// API 기본 설정
const API_BASE_URL = 'http://localhost:3001/api';

// API 응답 타입
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 에러 처리를 위한 커스텀 에러 클래스
export class ApiError extends Error {
  status: number;
  
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// 기본 fetch 래퍼 함수
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
    }
    
    const result: ApiResponse<T> = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'API request failed');
    }
    
    return result.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // 네트워크 에러 또는 기타 에러
    console.error('API request failed:', error);
    throw new Error('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
  }
}

// 난이도별 문제 가져오기
export async function fetchQuestionsByDifficulty(difficulty: Difficulty): Promise<QuizQuestion[]> {
  try {
    const questions = await apiRequest<QuizQuestion[]>(`/questions/${difficulty}`);
    return questions;
  } catch (error) {
    console.error(`Failed to fetch ${difficulty} questions:`, error);
    
    // 백엔드 연결 실패 시 로컬 데이터로 폴백
    console.warn('API 연결 실패, 로컬 데이터를 사용합니다.');
    const { getQuestionsByDifficulty } = await import('../data/questions');
    return getQuestionsByDifficulty(difficulty);
  }
}

// 퀴즈 결과 제출
export async function submitQuizResult(data: {
  difficulty: Difficulty;
  score: number;
  totalQuestions: number;
  userAnswers: (number | null)[];
  timeTaken?: number;
}): Promise<{ success: boolean; resultId?: string }> {
  try {
    const result = await apiRequest<{ resultId: string }>('/quiz/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    return { success: true, resultId: result.resultId };
  } catch (error) {
    console.error('Failed to submit quiz result:', error);
    return { success: false };
  }
}

// 사용자 통계 가져오기 (선택사항)
export async function fetchUserStats(): Promise<{
  totalQuizzes: number;
  averageScore: number;
  bestScore: number;
  difficultyStats: Record<Difficulty, { attempts: number; averageScore: number }>;
} | null> {
  try {
    const stats = await apiRequest<{
      totalQuizzes: number;
      averageScore: number;
      bestScore: number;
      difficultyStats: Record<Difficulty, { attempts: number; averageScore: number }>;
    }>('/user/stats');
    
    return stats;
  } catch (error) {
    console.error('Failed to fetch user stats:', error);
    return null;
  }
}
