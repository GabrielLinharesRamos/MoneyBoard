import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">MoneyBoard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/about" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            About MoneyBoard
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Learn about our mission to simplify personal financial control
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Mission Section */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              Democratize access to financial management tools, offering an 
              intuitive and powerful platform so anyone can take control of their finances.
            </p>
            <div className="mt-8 sm:flex">
              <div className="rounded-md shadow">
                <Link
                  href="/contact"
                  className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">100%</div>
                  <div className="text-sm text-gray-500">Free</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">24/7</div>
                  <div className="text-sm text-gray-500">Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">∞</div>
                  <div className="text-sm text-gray-500">Transactions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">🔒</div>
                  <div className="text-sm text-gray-500">Secure</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why choose MoneyBoard?
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Developed with the best technologies and UX practices
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Fast Interface</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Built with Next.js and Tailwind CSS for maximum performance and responsiveness.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Easy to Use</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Intuitive interface that requires no technical knowledge to get started.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Secure Data</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Your financial data is protected with end-to-end encryption.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Detailed Reports</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Visualize your expenses with interactive charts and personalized reports.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Technologies Used
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Modern stack for an exceptional experience
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-1 flex justify-center items-center">
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-2xl font-bold text-blue-600 mb-2">Next.js</div>
                <div className="text-sm text-gray-500">React Framework</div>
              </div>
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-2xl font-bold text-cyan-600 mb-2">Tailwind</div>
                <div className="text-sm text-gray-500">CSS Framework</div>
              </div>
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-2xl font-bold text-green-600 mb-2">Django</div>
                <div className="text-sm text-gray-500">Backend API</div>
              </div>
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-2xl font-bold text-blue-800 mb-2">TypeScript</div>
                <div className="text-sm text-gray-500">Language</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">© 2024 MoneyBoard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}