import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import axiosInstance from "../api/axiosInstance";

interface currentQuestionType {
  id: number,
  answer: number,
  content: string,
  explanation: string,
  imageUrl: string,
  level: number,
  options: {
    testNumber: number,
    optionContent: string,
  }[],
}

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


interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

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

  // Load questions based on difficulty
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
  
        // 👇 문자열 → 숫자 level 매핑
        let level = 1;
        if (difficulty === "중") level = 2;
        else if (difficulty === "상") level = 3;
  
        const response = await axiosInstance.get("/training/load"); // 전체 문제 요청
        const allQuestions: QuizQuestion[] = response.data;
  
        // 👇 해당 level 문제만 필터링 (최대 15개 제한)
        const filteredQuestions = allQuestions
          .filter((q: any) => q.level === level)
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

    // 슬라이드 아웃 애니메이션 시작
    setAnimationState("slideOut");

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        // 다음 문제로 이동
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(newAnswers[currentQuestion + 1]);

        // 슬라이드 인 애니메이션 시작
        setAnimationState("slideIn");

        // 애니메이션 완료 후 idle 상태로 변경
        setTimeout(() => {
          setAnimationState("idle");
        }, 300);
      } else {
        // Quiz completed - calculate score and navigate to results
        const score = newAnswers.reduce((total: number, answer, index) => {
          return total + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
        }, 0);

        navigate("/results", {
          state: {
            score: score,
            totalQuestions: quizQuestions.length,
            userAnswers: newAnswers,
            difficulty: difficulty,
          },
        });
      }
    }, 400); // 애니메이션 시간에 맞춰 조정
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

  const currentQuiz: currentQuestionType = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

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
  {[...new Map(currentQuiz.options.map(option => [option.testNumber, option])).values()]
    .slice(0, 2) // 답안 2개만 출력
    .map((option, index) => (
      <AnswerCard
        key={option.testNumber}
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
