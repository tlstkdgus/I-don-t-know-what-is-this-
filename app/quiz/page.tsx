import Sidebar from "@/components/Sidebar";
import Quiz from "@/components/Quiz";

export const metadata = {
  title: "셀프 체크 퀴즈",
  description: "Web3 이해도를 확인하는 8문항 퀴즈. 틀린 문제는 해당 챕터로 연결됩니다.",
};

export default function QuizPage() {
  return (
    <div className="shell">
      <Sidebar />
      <div className="content narrow">
        <div className="crumb">부록</div>
        <h1>셀프 체크 퀴즈</h1>
        <p className="lead">
          전부 읽었다면 아래 문제들이 풀려야 합니다. 선택지를 클릭하면 해설과 복습할 챕터 링크가 나옵니다.
        </p>
        <Quiz />
      </div>
    </div>
  );
}
