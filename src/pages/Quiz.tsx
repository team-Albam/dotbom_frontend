import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import axiosInstance from "../api/axiosInstance";

// 문제 타입 정의
interface QuizQuestion {
  id: number;
  level: number;
  content: string;
  answer: number; // 1부터 시작
  explanation: string;
  imageUrl: string | null;
  options: {
    testNumber: number;
    optionContent: string;
  }[];
}

// 스타일 정의 생략 없이 포함
const QuizContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #ffe4e1 0%,
    #fff8dc 25%,
    #ffffff 50%,
    #f0f8ff 75%,
    #e6e6fa 100%
  );
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const ProgressText = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const ProgressIndicator = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const ProgressBar = styled.div`
  width: 300px;
  height: 8px;
  background: #e5e5e5;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 100%;
  background: #51cbff;
  transition: width 0.3s ease;
`;

const QuestionSection = styled.div<{ animate: "idle" | "slideOut" | "slideIn" }>`
  text-align: center;
  margin-bottom: 60px;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform: ${(props) => {
    if (props.animate === "slideOut") return "translateX(-100%)";
    if (props.animate === "slideIn") return "translateX(0)";
    return "translateX(0)";
  }};
  opacity: ${(props) => (props.animate === "slideOut" ? 0 : 1)};

  ${(props) =>
    props.animate === "slideIn" &&
    `
    animation: slideInFromRight 0.3s ease-in-out;
  `}

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const QuestionText = styled.p`
  font-size: 20px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 40px;
`;

const AnswerSection = styled.div<{ animate: "idle" | "slideOut" | "slideIn" }>`
  display: flex;
  gap: 40px;
  justify-content: center;
  margin-bottom: 60px;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform: ${(props) => {
    if (props.animate === "slideOut") return "translateX(-100%)";
    if (props.animate === "slideIn") return "translateX(0)";
    return "translateX(0)";
  }};
  opacity: ${(props) => (props.animate === "slideOut" ? 0 : 1)};

  ${(props) =>
    props.animate === "slideIn" &&
    `
    animation: slideInFromRight 0.3s ease-in-out;
  `}
`;

const AnswerCard = styled.button<{ selected: boolean }>`
  min-width: 120px;
  min-height: 120px;
  padding: 12px;
  border-radius: 12px;
  background: ${(props) => (props.selected ? "#51CBFF" : "white")};
  border: 2px solid ${(props) => (props.selected ? "#51CBFF" : "#e5e5e5")};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  word-break: keep-all;

  &:hover {
    border-color: #51cbff;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(81, 203, 255, 0.3);
  }
`;

const AnswerText = styled.span<{ selected: boolean }>`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => (props.selected ? "white" : "#333")};
  line-height: 1.4;
  white-space: normal;
  word-break: keep-all;
`;

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const { difficulty } = useParams<{ difficulty: string }>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [animationState, setAnimationState] = useState<"idle" | "slideOut" | "slideIn">("idle");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        let level = 1;
        if (difficulty === "중") level = 2;
        else if (difficulty === "상") level = 3;

        const response = await axiosInstance.get("/training/load");
        const allQuestions: QuizQuestion[] = response.data;

        const filteredQuestions = allQuestions
          .filter((q) => q.level === level && q.options && q.options.length > 0)
          .slice(0, 5);
          

        setQuizQuestions(filteredQuestions);
        setAnswers(new Array(filteredQuestions.length).fill(null));
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setAnimationState("idle");
      } catch (err) {
        console.error("Failed to load questions:", err);
        setError(err instanceof Error ? err.message : "문제를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [difficulty]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    setAnimationState("slideOut");

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(newAnswers[currentQuestion + 1]);
        setAnimationState("slideIn");

        setTimeout(() => setAnimationState("idle"), 300);
      } else {
        const score = newAnswers.reduce((total: number, answer, index) => {
          const question = quizQuestions[index];
          if (!question || typeof question.answer !== 'number') return total;
        
          const correctIndex = question.answer - 1;
          return total + (answer === correctIndex ? 1 : 0);
        }, 0);
        
        

        navigate("/results", {
          state: {
            score,
            totalQuestions: quizQuestions.length,
            userAnswers: newAnswers,
            quizQuestions: quizQuestions.map((q) => ({
              question: q.content, // 문제 텍스트
              correctAnswer: q.answer - 1, // 정답 인덱스 (0부터 시작)
              options: q.options.map((opt) => opt.optionContent), // 보기 배열
              explanation: q.explanation, // 해설
            })),
            difficulty,
          },
        });
      }
    }, 400);
  };

  if (loading) {
    return (
      <QuizContainer>
        <Navigation />
        <ContentContainer>
          <div>문제를 불러오는 중...</div>
        </ContentContainer>
      </QuizContainer>
    );
  }

  if (error) {
    return (
      <QuizContainer>
        <Navigation />
        <ContentContainer>
          <div style={{ color: "#f44336", textAlign: "center" }}>
            <h3>오류가 발생했습니다</h3>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "10px 20px",
                backgroundColor: "#51CBFF",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              다시 시도
            </button>
          </div>
        </ContentContainer>
      </QuizContainer>
    );
  }

  if (quizQuestions.length === 0) {
    return (
      <QuizContainer>
        <Navigation />
        <ContentContainer>
          <div>문제를 불러오는 중...</div>
        </ContentContainer>
      </QuizContainer>
    );
  }

  const currentQuiz = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const displayedOptions = currentQuiz.options
    .filter((opt) => opt.testNumber >= 1 && opt.testNumber <= 4)
    .slice(0, 4);

  return (
    <QuizContainer>
      <Navigation />
      <ContentContainer>
        <ProgressSection>
          <ProgressText>다음 단어에서 ( ) 안에 들어갈 받침으로 알맞은 것을 골라주세요.</ProgressText>
          <ProgressContainer>
            <ProgressIndicator>
              {currentQuestion + 1} / {quizQuestions.length}
            </ProgressIndicator>
          </ProgressContainer>
          <ProgressBar>
            <ProgressFill progress={progress} />
          </ProgressBar>
        </ProgressSection>

        <QuestionSection animate={animationState}>
          <QuestionText>{currentQuiz.content}</QuestionText>
        </QuestionSection>

        <AnswerSection animate={animationState}>
          {displayedOptions.map((option, index) => (
            <AnswerCard
              key={`${currentQuiz.id}-${index}`}
              selected={selectedAnswer === index}
              onClick={() => handleAnswerSelect(index)}
            >
              <AnswerText selected={selectedAnswer === index}>
                {option.optionContent}
              </AnswerText>
            </AnswerCard>
          ))}
        </AnswerSection>
      </ContentContainer>
    </QuizContainer>
  );
};

export default Quiz;
