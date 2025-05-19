
const Payments = () => {
  return (
    <section className="">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-10 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">
            Affordable Plans for Every Community
          </h2>
          <p className="mb-5 font-light sm:text-xl text-gray-400">
            Whether you're managing a single building or an entire gated society, LivelyChat offers flexible pricing to connect your community effortlessly.
          </p>
        </div>

        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">

          {/* STARTER PLAN */}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-white bg-gray-800 rounded-lg border border-gray-600 shadow">
            <h3 className="mb-4 text-2xl font-semibold">Starter</h3>
            <p className="font-light text-gray-400 sm:text-lg">
              Perfect for individuals or a small apartment to stay in touch.
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">$29</span>
              <span className="text-gray-400">/month</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
              <li className="flex items-center space-x-3">✅ 1 verified building</li>
              <li className="flex items-center space-x-3">✅ Basic chat and feed features</li>
              <li className="flex items-center space-x-3">✅ 6 months free support</li>
              <li className="flex items-center space-x-3">✅ Free updates: 24 months</li>
            </ul>
            <a href="#" className="text-white hover:bg-[#1B57E9] bg-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Get Started
            </a>
          </div>

          {/* COMMUNITY PLAN */}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-white bg-gray-800 rounded-lg border border-gray-600 shadow">
            <h3 className="mb-4 text-2xl font-semibold">Community</h3>
            <p className="font-light sm:text-lg text-gray-400">
              Designed for buildings or societies with multiple residents.
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">$99</span>
              <span className="text-gray-400">/month</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
              <li className="flex items-center space-x-3">✅ Up to 10 buildings</li>
              <li className="flex items-center space-x-3">✅ Admin dashboard</li>
              <li className="flex items-center space-x-3">✅ Priority support: 12 months</li>
              <li className="flex items-center space-x-3">✅ Free updates: 36 months</li>
            </ul>
            <a href="#" className="text-white hover:bg-[#1B57E9] bg-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Get Started
            </a>
          </div>

          {/* ENTERPRISE PLAN */}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-white bg-gray-800 rounded-lg border border-gray-600 shadow">
            <h3 className="mb-4 text-2xl font-semibold">Enterprise</h3>
            <p className="font-light sm:text-lg text-gray-400">
              Great for municipalities, property managers, or smart city projects.
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">$499</span>
              <span className="text-gray-400">/month</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
              <li className="flex items-center space-x-3">✅ Unlimited buildings</li>
              <li className="flex items-center space-x-3">✅ Full API access & analytics</li>
              <li className="flex items-center space-x-3">✅ Premium onboarding</li>
              <li className="flex items-center space-x-3">✅ Free updates: 48 months</li>
            </ul>
            <a href="#" className="text-white hover:bg-[#1B57E9] bg-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Get Started
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Payments;
