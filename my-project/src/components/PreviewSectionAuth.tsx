import { CheckCircle } from "lucide-react";

const PreviewSectionAuth = () => {
  return (
    <div className="hidden lg:flex flex-1 bg-linear-to-br from-blue-500 to-purple-600 p-12">
      <div className="flex flex-col justify-center w-full max-w-md mx-auto">
        {/* Testimonial */}
        <div className="text-white mb-12">
          <div className="text-4xl font-bold mb-6">
            "FinTrack helped me save $12,000 in my first year. Absolutely
            life-changing!"
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="font-semibold">SJ</span>
            </div>
            <div>
              <div className="font-semibold">Sarah Johnson</div>
              <div className="text-blue-100">Marketing Director</div>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4 text-white/90">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <span>Real-time expense tracking and categorization</span>
          </div>

          <div className="flex items-center space-x-4 text-white/90">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <span>Automated budget planning and goal setting</span>
          </div>

          <div className="flex items-center space-x-4 text-white/90">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <span>Bank-level security with end-to-end encryption</span>
          </div>

          <div className="flex items-center space-x-4 text-white/90">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <span>Multi-device sync across all your platforms</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">50K+</div>
            <div className="text-blue-100 text-sm">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">$2.1B+</div>
            <div className="text-blue-100 text-sm">Managed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">4.8/5</div>
            <div className="text-blue-100 text-sm">Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSectionAuth;
