import { FiBook, FiMessageSquare, FiFolder, FiUsers, FiUser, FiShare2, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const services = [
  { name: 'Expert Guidance', icon: FiBook, description: 'Get direct access to industry leaders and qualified mentors.' },
  { name: 'Q&A Platform', icon: FiMessageSquare, description: 'Ask tough questions and get reliable, verified answers.' },
  { name: 'Project Creation', icon: FiFolder, description: 'Launch your ideas with powerful tools and community support.' },
  { name: 'Collaborative Learning', icon: FiUsers, description: 'Join study groups and work together on real-world problems.' },
  { name: 'Personalized Feed', icon: FiUser, description: 'Content tailored to your interests and learning goals.' },
  { name: 'Resource Sharing', icon: FiShare2, description: 'Access a vast library of shared knowledge and tools.' },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-24 pb-12 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 animate-in slide-in-from-bottom duration-700 fade-in">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
            Now in Beta
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Connect, Learn, and <span className="text-primary">Collaborate</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Unlock real-time advice from industry experts. Whether you're seeking answers or looking to collaborate, Tecora connects you with the right minds to succeed.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
              Get Started <FiArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8">
              Learn more
            </button>
          </div>
        </div>
        <div className="flex-1 relative w-full max-w-lg aspect-square items-center justify-center hidden md:flex animate-in fade-in duration-1000 zoom-in-50">
           {/* Abstract Decoration */}
           <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl" />
           <div className="relative bg-card border border-border rounded-xl p-8 shadow-2xl skew-y-3 transform transition-transform hover:skew-y-0 duration-500">
              <div className="space-y-4">
                <div className="h-8 w-8 rounded bg-primary/20" />
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-4 w-1/2 rounded bg-muted" />
                <div className="h-32 rounded bg-muted/20 mt-4" />
              </div>
           </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Everything you need to grow</h2>
          <p className="text-lg text-muted-foreground">
            We provide the tools and connections you need to accelerate your learning journey and professional growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.name}
                className="group p-6 bg-card hover:bg-accent/50 border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-muted/50 rounded-3xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center gap-12 mb-20">
        <div className="flex-1 space-y-6">
           <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
           <p className="text-lg text-muted-foreground leading-relaxed">
             At Tecora, we believe knowledge is most valuable when shared. We are empowering the next generation of professionals by bridging the gap between learners and experts, fostering a global community of collaboration and growth.
           </p>
           <Link to="/about" className="text-primary font-medium hover:underline inline-flex items-center">
             Read our full story <FiArrowRight className="ml-1" />
           </Link>
        </div>
        <div className="flex-1 flex justify-center">
           <div className="relative w-64 h-64 bg-background border border-border rounded-full flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-primary">Tecora</span>
           </div>
        </div>
      </section>
    </div>
  );
}