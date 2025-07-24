import { getUser } from "@/actions/user-actions";
import Todos from "@/components/todos";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user: any = await currentUser();

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Welcome to Todo App
            </h1>
            <div className="w-16 h-16 mx-auto mb-6 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Get Started
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You need to sign in to create and manage your todos. Sign in to
              get started with organizing your tasks!
            </p>
            <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Please sign in to continue
            </div>
          </div>
        </div>
      </main>
    );
  }

  const fetchedData = await getUser(user?.id);
  console.log(fetchedData);

  return (
    fetchedData && (
      <main className="flex items-center justify-between">
        <Todos todos={fetchedData[0].todos} user={fetchedData[0]} />
      </main>
    )
  );
}
