import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useSettings } from "../contexts/SettingsContext";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  font-size: 16px;
  color: #666;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #4682b4;

  &:hover {
    color: #357abd;
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const OptionButton = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  padding: 20px;
  border: 2px solid ${(props) => (props.$selected ? "#4682B4" : "#ddd")};
  border-radius: 15px;
  background: ${(props) => (props.$selected ? "#f0f8ff" : "white")};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;

  &:hover {
    border-color: #4682b4;
    background: #f0f8ff;
  }
`;

const RadioButton = styled.div<{ $selected: boolean; $color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.$color};
  background: ${(props) => (props.$selected ? props.$color : "white")};
  position: relative;

  ${(props) =>
    props.$selected &&
    css`
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 50%;
      }
    `}
`;

const OptionText = styled.span<{ $color: string }>`
  color: ${(props) => props.$color};
  font-size: 16px;
  font-weight: 500;
`;

const FinishButton = styled.button`
  background: #4682b4;
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 30px;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background: #357abd;
  }
`;

const QuestionTransition = styled.div<{ $animate: boolean }>`
  transition: opacity 0.4s, transform 0.4s;
  opacity: 1;
  transform: translateX(0);
  ${(props) =>
    props.$animate &&
    css`
      opacity: 0;
      transform: translateX(-40px); /* 오른쪽(40px) -> 왼쪽(-40px)으로 변경 */
      pointer-events: none;
    `}
`;

// 질문 데이터
const questions = [
  {
    id: 1,
    title: "어느 쪽이 더 읽기 편하신가요?",
    options: [
      {
        text: "어느 쪽이 더 읽기 편하신가요?",
        color: "#4CAF50",
        style: { color: "#4CAF50" },
      },
      {
        text: "어느 쪽이 더 읽기 편하신가요?",
        color: "#F44336",
        style: { color: "#F44336" },
      },
      {
        text: "어느 쪽이 더 읽기 편하신가요?",
        color: "#2196F3",
        style: { color: "#2196F3" },
      },
      {
        text: "어느 쪽이 더 읽기 편하신가요?",
        color: "#FFC107",
        style: { color: "#FFC107" },
      },
    ],
    settingKey: "textColor" as const,
  },
  {
    id: 2,
    title: "어느 쪽이 더 읽기 편하신가요?",
    options: [
      {
        text: "어느 쪽이 더 읽기 편하신가요?",
        color: "#000",
        style: { backgroundColor: "#ffffff", color: "#000" },
      },
      {
        text: "어느 쪽이 더 읽기 편하신가요?",
        color: "#fff",
        style: { backgroundColor: "#333", color: "#fff" },
      },
      {
        text: "어느 쪽이 더 읽기 편하신가요?",
        color: "#000",
        style: { backgroundColor: "#eeeeee", color: "#000" },
      },
      {
        text: "어느 쪽이 더 읽기 편하신가요?",
        color: "#000",
        style: { backgroundColor: "#fdf5e6", color: "#000" },
      },
    ],
    settingKey: "backgroundColor" as const,
  },
  {
    id: 3,
    title: "어느 쪽이 더 읽기 편하신가요?",
    options: [
      {
        text: "어느 쪽이 더 읽기 편하신가요?",
        color: "#666",
        style: { fontFamily: "Arial, sans-serif" },
      },
      {
        text: "어느 쪽이 더 읽기 편하신가요?",
        color: "#666",
        style: { fontFamily: "'Noto Sans KR', sans-serif" },
      },
      {
        text: "어느 쪽이 더 읽기 편하신가요?",
        color: "#666",
        style: { fontFamily: "'Nanum Myeongjo', serif" },
      },
      {
        text: "어느 쪽이 더 읽기 편하신가요?",
        color: "#666",
        style: { fontFamily: "'Cafe24 Ssurround', sans-serif" },
      },
    ],
    settingKey: "fontFamily" as const,
  },
  {
    id: 4,
    title: "어느 쪽이 더 읽기 편하신가요?",
    options: [
      {
        text: "어느 쪽이 더 읽기 편하신가요?",
        color: "#666",
        style: { fontSize: "14px" },
      },
      {
        text: "어느 쪽이 더 읽기 편하신가요?",
        color: "#666",
        style: { fontSize: "16px" },
      },
      {
        text: "어느 쪽이 더 읽기 편하신가요?",
        color: "#666",
        style: { fontSize: "18px" },
      },
      {
        text: "어느 쪽이 더 읽기 편하신가요?",
        color: "#666",
        style: { fontSize: "22px" },
      },
    ],
    settingKey: "fontSize" as const,
  },
  {
    id: 5,
    title: "어느 쪽이 더 읽기 편하신가요?",
    options: [
      {
        text: "어느 쪽이 더 읽기 편하신가요?",
        color: "#666",
        style: { letterSpacing: "-0.5px" },
      },
      {
        text: "어느 쪽이 더 읽기 편하신가요?",
        color: "#666",
        style: { letterSpacing: "0px" },
      },
      {
        text: "어느 쪽이 더 읽기 편하신가요?",
        color: "#666",
        style: { letterSpacing: "1px" },
      },
      {
        text: "어느 쪽이 더 읽기 편하신가요?",
        color: "#666",
        style: { letterSpacing: "2px" },
      },
    ],
    settingKey: "letterSpacing" as const,
  },
];

const SettingsModal: React.FC = () => {
  const { isModalOpen, setIsModalOpen, updateSettings } = useSettings();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [animate, setAnimate] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: optionIndex }));
    if (currentStep < 5) {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
        setCurrentStep((prev) => prev + 1);
      }, 400);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    const newSettings: Record<string, string> = {};
    Object.entries(answers).forEach(([step, answer]) => {
      const question = questions[parseInt(step) - 1];
      const option = question.options[answer];
      if (question.settingKey === "fontSize") {
        newSettings[question.settingKey] = ["14px", "16px", "18px", "22px"][
          answer
        ];
      } else if (question.settingKey === "letterSpacing") {
        newSettings[question.settingKey] = ["-0.5px", "0px", "1px", "2px"][
          answer
        ];
      } else {
        newSettings[question.settingKey] =
          (option.style?.[question.settingKey] as string) ?? "";
      }
    });

    updateSettings(newSettings);
    setIsModalOpen(false);
    setCurrentStep(1);
    setAnswers({});
  };

  const currentQuestion = questions[currentStep - 1];
  const currentAnswer = answers[currentStep];

  if (!isModalOpen) return null;

  return (
    <ModalOverlay onClick={() => setIsModalOpen(false)}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>

        <Pagination>
          <ArrowButton onClick={handlePrevious} disabled={currentStep === 1}>
            ‹
          </ArrowButton>
          <span>{currentStep}/5</span>
          <ArrowButton
            onClick={() =>
              currentStep < 5 && setCurrentStep((prev) => prev + 1)
            }
            disabled={currentStep === 5}
          >
            ›
          </ArrowButton>
        </Pagination>

        {/* 질문/옵션에 트랜지션 적용 */}
        <QuestionTransition $animate={animate} key={currentStep}>
          <Title>{currentQuestion.title}</Title>
          <OptionsContainer>
            {currentQuestion.options.map((option, index) => (
              <OptionButton
                key={index}
                $selected={currentAnswer === index}
                onClick={() => handleOptionSelect(index)}
              >
                <RadioButton
                  $selected={currentAnswer === index}
                  $color={option.color}
                />
                <OptionText
                  $color={option.color}
                  style={option.style as React.CSSProperties}
                >
                  {option.text}
                </OptionText>
              </OptionButton>
            ))}
          </OptionsContainer>
        </QuestionTransition>

        {currentStep === 5 && (
          <FinishButton onClick={handleFinish}>설정 끝내기</FinishButton>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default SettingsModal;
