import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Armchair, Layout, Users, Zap, ArrowRight, Sparkles, Grid3x3, MousePointer2 } from "lucide-react";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
            {/* Navigation */}
            <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
                        <Armchair className="text-white" size={24} />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        CoSeat
                    </span>
                </div>
                <Link href="/sign-in">
                    <Button variant="outline" className="rounded-full">
                        Sign In
                    </Button>
                </Link>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-20 text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                        <Sparkles size={16} />
                        The most seamless seating arrangement organizer
                    </div>
                    
                    <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Design Perfect
                        </span>
                        <br />
                        <span className="text-neutral-900">
                            Seating Layouts
                        </span>
                    </h1>
                    
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                        Create, collaborate, and organize seating arrangements for any event. 
                        From weddings to conferences, make every seat count.
                    </p>

                    <div className="flex gap-4 justify-center items-center flex-wrap">
                        <Link href="/home">
                            <Button size="lg" className="rounded-full text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                Get Started Free
                                <ArrowRight className="ml-2" size={20} />
                            </Button>
                        </Link>
                        <Link href="/home">
                            <Button size="lg" variant="outline" className="rounded-full text-lg px-8 py-6">
                                View Demo
                            </Button>
                        </Link>
                    </div>

                    {/* Hero Image/Canvas Preview */}
                    <div className="mt-16 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl -z-10" />
                        <div className="bg-white rounded-3xl shadow-2xl border border-neutral-200 p-8 backdrop-blur">
                            <div className="bg-neutral-50 rounded-2xl p-12 min-h-[400px] relative overflow-hidden">
                                {/* Simulated Canvas Grid */}
                                <div className="absolute inset-0 opacity-10">
                                    <Grid3x3 className="w-full h-full text-neutral-400" />
                                </div>
                                
                                {/* Simulated Chairs and Tables */}
                                <div className="relative z-10 flex flex-col gap-8 items-center justify-center h-full">
                                    <div className="flex gap-4">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="bg-blue-100 p-4 rounded-lg shadow-sm hover:scale-110 transition-transform">
                                                <Armchair className="text-blue-600" size={32} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-purple-100 px-16 py-8 rounded-2xl shadow-md">
                                        <Layout className="text-purple-600" size={48} />
                                    </div>
                                    <div className="flex gap-4">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="bg-blue-100 p-4 rounded-lg shadow-sm hover:scale-110 transition-transform">
                                                <Armchair className="text-blue-600" size={32} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Floating Action Indicator */}
                                <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm">
                                    <MousePointer2 size={16} className="text-purple-600" />
                                    <span className="text-neutral-600">Drag & Drop</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                        Everything you need to organize
                    </h2>
                    <p className="text-xl text-neutral-600">
                        Powerful features that make seating arrangements effortless
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Feature 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-neutral-200">
                        <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                            <MousePointer2 className="text-blue-600" size={28} />
                        </div>
                        <h3 className="text-2xl font-semibold mb-3 text-neutral-900">
                            Intuitive Canvas
                        </h3>
                        <p className="text-neutral-600 leading-relaxed">
                            Drag, drop, and arrange seats with an infinite canvas. Zoom and pan to perfect every detail of your layout.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-neutral-200">
                        <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                            <Users className="text-purple-600" size={28} />
                        </div>
                        <h3 className="text-2xl font-semibold mb-3 text-neutral-900">
                            Collaborate Together
                        </h3>
                        <p className="text-neutral-600 leading-relaxed">
                            Share event codes with your team. Work together in real-time to create the perfect seating arrangement.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-neutral-200">
                        <div className="bg-pink-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                            <Zap className="text-pink-600" size={28} />
                        </div>
                        <h3 className="text-2xl font-semibold mb-3 text-neutral-900">
                            Lightning Fast
                        </h3>
                        <p className="text-neutral-600 leading-relaxed">
                            Built for speed and performance. Create and modify seating plans in seconds, not hours.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-neutral-200">
                        <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                            <Layout className="text-green-600" size={28} />
                        </div>
                        <h3 className="text-2xl font-semibold mb-3 text-neutral-900">
                            Flexible Layouts
                        </h3>
                        <p className="text-neutral-600 leading-relaxed">
                            Add tables, blocks, and obstacles. Design complex layouts for any venue or event size.
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-neutral-200">
                        <div className="bg-orange-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                            <Armchair className="text-orange-600" size={28} />
                        </div>
                        <h3 className="text-2xl font-semibold mb-3 text-neutral-900">
                            Named Seating
                        </h3>
                        <p className="text-neutral-600 leading-relaxed">
                            Assign names to chairs, manage guest lists, and keep track of who sits where with ease.
                        </p>
                    </div>

                    {/* Feature 6 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-neutral-200">
                        <div className="bg-cyan-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                            <Sparkles className="text-cyan-600" size={28} />
                        </div>
                        <h3 className="text-2xl font-semibold mb-3 text-neutral-900">
                            Multiple Events
                        </h3>
                        <p className="text-neutral-600 leading-relaxed">
                            Manage unlimited events. Perfect for wedding planners, event organizers, and venue managers.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-6 py-20">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/10" />
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to organize your next event?
                        </h2>
                        <p className="text-xl mb-8 text-blue-100">
                            Be one of the first to experience the future of seating arrangement planning.
                        </p>
                        <Link href="/home">
                            <Button size="lg" className="rounded-full text-lg px-10 py-6 bg-white text-purple-600 hover:bg-neutral-100">
                                Start Planning Now
                                <ArrowRight className="ml-2" size={20} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="container mx-auto px-6 py-12 border-t border-neutral-200">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
                            <Armchair className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            CoSeat
                        </span>
                    </div>
                    <p className="text-neutral-600">
                        © 2025 CoSeat. Making every seat count.
                    </p>
                </div>
            </footer>
        </div>
    )
};

export default LandingPage;