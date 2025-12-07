import QuizComponent from "./quiz";
export default async function QuizPage() {
  const URL = process.env.FRONTEND_URL;
  const response = await fetch(`${URL}/api/quiz`);
  if (response.status !== 200) {
    return (
      <div className="h-screen w-screen flex justify-center">
        <div className="w-auto h-auto text-center flex items-center">
          <p className="font-bold text-red-600">Error {response.status}</p>
        </div>
      </div>
    );
  }
  const data = await response.json();
  const questionsArray = data.response.data;

  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full text-center pb-8">
          <h1 className="text-2xl font-bold">Quiz App</h1>
        </div>
        <QuizComponent data={questionsArray} />
      </main>
    </div>
  );
}
