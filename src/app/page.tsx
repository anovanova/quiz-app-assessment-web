export default async function Home() {
  const response = await fetch("http://localhost:3000/api/quiz");
  const data = await response.json();
  const questionsArray = data.response.data;

  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Quiz App</h1>
        {questionsArray.map((item) => {
          return (
            <div key={item.id}>
              <h2>{item.question}</h2>
            </div>
          );
        })}
      </main>
    </div>
  );
}
