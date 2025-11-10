import {
  DollarSign,
  TrendingUp,
  Shield,
  PieChart,
  Target,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Star,
  BarChart3,
  Smartphone,
} from "lucide-react";

const LandingPage = () => {
  const features = [
    {
      icon: PieChart,
      title: "Smart Budgeting",
      description:
        "Create custom budgets and track your spending with intelligent categorization.",
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description:
        "Set financial goals and monitor your progress with visual progress bars.",
    },
    {
      icon: CreditCard,
      title: "Multi-Card Support",
      description:
        "Manage all your debit, credit, and cash cards in one secure place.",
    },
    {
      icon: BarChart3,
      title: "Advanced Reports",
      description:
        "Get detailed insights with beautiful charts and spending analytics.",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description:
        "Your data is encrypted and secure with enterprise-grade protection.",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description:
        "Access your finances anywhere with our responsive mobile design.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Freelance Designer",
      content:
        "FinTrack helped me save $5,000 in just 3 months. The goal tracking feature is incredible!",
      avatar: "SJ",
    },
    {
      name: "Mike Chen",
      role: "Software Engineer",
      content:
        "Finally, a budgeting app that actually understands how I want to manage my money.",
      avatar: "MC",
    },
    {
      name: "Emily Davis",
      role: "Teacher",
      content:
        "The visual reports made me realize where I was overspending. Life-changing!",
      avatar: "ED",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "$2.1B+", label: "Managed" },
    { number: "4.8/5", label: "Rating" },
    { number: "98%", label: "Success Rate" },
  ];

  return (
    <>
      <section className="pt-30 pb-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Take Control of Your
                <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Financial Future
                </span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 max-w-2xl">
                The all-in-one budgeting platform that helps you save more,
                spend wisely, and achieve your financial goals faster.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
                <button className="bg-linear-to-br from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-lg font-semibold flex items-center justify-center space-x-2">
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors text-lg font-semibold">
                  Watch Demo
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Hero Image/Graphic */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="bg-linear-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-blue-100 text-sm">Total Balance</p>
                      <p className="text-2xl font-bold">$12,456.78</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-200" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-blue-100">Income</p>
                      <p className="font-semibold">$5,250.00</p>
                    </div>
                    <div>
                      <p className="text-blue-100">Expenses</p>
                      <p className="font-semibold">$3,890.00</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly Budget</span>
                    <span className="font-semibold">75% used</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "75%" }}></div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 w-24">
                <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-1" />
                <p className="text-xs text-center text-gray-600">+12% Growth</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 w-24">
                <Target className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                <p className="text-xs text-center text-gray-600">3 Goals Met</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {stat.number}
                </p>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Everything You Need to Master Your Finances
            </h2>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
              Powerful features designed to give you complete control over your
              financial life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Loved by Thousands
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              See what our users are saying about their financial
              transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-md">
                <div className="flex items-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already taken control of their
            financial future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold shadow-lg">
              Start Free Trial
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors text-lg font-semibold">
              Schedule Demo
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">FinTrack</span>
              </div>
              <p className="text-gray-400">
                Taking control of your financial future, one budget at a time.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Updates
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    GDPR
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FinTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
