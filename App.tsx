
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowRight, CheckCircle2, 
  ChefHat, User, Bath, Briefcase, 
  Monitor, Layout, MessageSquare, ChevronDown, 
  Send, Phone, Search, PencilRuler, Hammer,
  ClipboardList, Factory, Truck, Instagram
} from 'lucide-react';

// --- Constants ---
const WHATSAPP_LINK = "https://wa.me/5519982343000?text=Olá! Gostaria de solicitar um orçamento de marcenaria sob medida.";
const CTA_TEXT = "Solicitar orçamento no WhatsApp";

// --- Assets ---
const Logo = ({
  className = "w-10 h-10",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) => (
  <img
    src={variant === "light" ? "/logo-light.png" : "/logo-dark.png"}
    alt="Cavallaro Marcenaria"
    className={className}
    loading="eager"
    decoding="async"
  />
);



// --- Types ---
interface StepProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLast?: boolean;
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
}

interface StudyCardProps {
  title: string;
  description: string;
}

interface FAQItemProps {
  question: string;
  answer: string;
}

// --- Components ---

const RevealOnScroll: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Início', href: '#inicio' },
    { label: 'Processo', href: '#processo' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Estudos', href: '#estudos' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Contato', href: '#contato' },
  ];

  const textColor = isScrolled ? 'text-deep-blue' : 'text-sand';
  const logoColor = isScrolled ? '#2e266d' : '#f5f2ed';
  const buttonClass = isScrolled 
    ? 'bg-deep-blue text-white hover:bg-opacity-90' 
    : 'bg-sand text-deep-blue hover:bg-white';

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#inicio" className={`flex items-center gap-3 font-serif text-2xl font-bold tracking-tight transition-colors duration-300 ${textColor}`}>
         <Logo className="w-10 h-10" variant={isScrolled ? "dark" : "light"} />
          <div className="flex flex-col leading-none">
            <span>Cavallaro</span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-light mt-1">Marcenaria</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a key={item.label} href={item.href} className={`text-sm font-medium transition-colors duration-300 ${textColor} hover:opacity-70`}>
              {item.label}
            </a>
          ))}
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.instagram.com/cavallaro.marcenaria/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`transition-all hover:scale-110 ${textColor}`}
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={`px-6 py-2 rounded-sm text-sm font-medium transition-all duration-300 ${buttonClass}`}>
              {CTA_TEXT}
            </a>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-4 lg:hidden">
           <a 
              href="https://www.instagram.com/cavallaro.marcenaria/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`transition-all ${textColor}`}
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
          <button 
            className={`transition-colors duration-300 ${textColor}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-deep-blue z-40 lg:hidden transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full justify-center items-center space-y-8">
          <Logo className="w-20 h-20 mb-4" variant="light" />
          {menuItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-serif text-white hover:text-sand transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a 
            href="https://www.instagram.com/cavallaro.marcenaria/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white flex items-center gap-2 hover:text-sand transition-colors"
          >
            <Instagram size={24} /> @cavallaro.marcenaria
          </a>
          <a 
            href={WHATSAPP_LINK} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="bg-sand text-deep-blue px-8 py-3 rounded-sm font-bold"
          >
            {CTA_TEXT}
          </a>
        </div>
      </div>
    </header>
  );
};

const Hero = () => (
  <section id="inicio" className="min-h-screen flex items-center pt-20 overflow-hidden relative bg-gradient-to-br from-[#1e194d] via-deep-blue to-[#3a3285]">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-white opacity-[0.02] transform skew-x-12 translate-x-1/4 pointer-events-none"></div>
    
    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
      <div>
        <RevealOnScroll>
          <div className="inline-block px-4 py-1 bg-sand/10 border border-sand/20 rounded-full mb-6">
            <span className="text-sand text-xs font-bold uppercase tracking-widest">Móveis Planejados em Campinas, Hortolândia e Região</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-6xl text-sand leading-tight mb-6">
            Marcenaria sob medida com projeto, execução e acompanhamento do início ao fim
          </h1>
        </RevealOnScroll>
        <RevealOnScroll className="stagger-1">
          <p className="text-lg text-sand/80 mb-10 max-w-lg leading-relaxed">
            Projetamos, acompanhamos a produção e realizamos a montagem com atenção real aos detalhes. Atendemos Campinas, Hortolândia e região com excelência em marcenaria sob medida.
          </p>
        </RevealOnScroll>
        <RevealOnScroll className="stagger-2 flex flex-col sm:flex-row gap-4">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-sand text-deep-blue px-8 py-4 rounded-sm font-bold flex items-center justify-center gap-2 group hover:gap-3 transition-all shadow-xl shadow-black/20">
            {CTA_TEXT} <ArrowRight size={18} />
          </a>
          <a href="#processo" className="border border-sand/30 text-sand px-8 py-4 rounded-sm font-medium hover:bg-sand/10 transition-all text-center">
            Conheça nosso método
          </a>
        </RevealOnScroll>
      </div>
      <RevealOnScroll className="relative flex justify-center lg:justify-end">
        <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 shadow-2xl rounded-sm border border-white/20 max-w-sm relative transform hover:rotate-1 transition-transform duration-500">
          <div className="absolute -top-4 -right-4 bg-sand text-deep-blue p-3 rounded-full shadow-lg">
            <ChefHat size={24} />
          </div>
          
          <svg width="300" height="240" viewBox="0 0 300 240" className="w-full h-auto mb-6">
            <rect x="20" y="20" width="260" height="200" fill="#2e266d" fillOpacity="0.03" stroke="#2e266d" strokeWidth="1" />
            <rect x="40" y="40" width="60" height="40" fill="#2e266d" fillOpacity="0.1" stroke="#2e266d" strokeWidth="1" />
            <circle cx="70" cy="60" r="10" fill="none" stroke="#2e266d" strokeWidth="0.5" />
            <rect x="200" y="40" width="60" height="40" fill="#2e266d" fillOpacity="0.1" stroke="#2e266d" strokeWidth="1" />
            <circle cx="215" cy="50" r="4" fill="#2e266d" />
            <circle cx="245" cy="50" r="4" fill="#2e266d" />
            <circle cx="215" cy="70" r="4" fill="#2e266d" />
            <circle cx="245" cy="70" r="4" fill="#2e266d" />
            <line x1="20" y1="120" x2="280" y2="120" stroke="#2e266d" strokeWidth="1" />
            <line x1="100" y1="120" x2="100" y2="220" stroke="#2e266d" strokeWidth="1" />
            <line x1="200" y1="120" x2="200" y2="220" stroke="#2e266d" strokeWidth="1" />
            <path d="M70 100 Q150 150 230 100" fill="none" stroke="#2e266d" strokeWidth="0.5" strokeDasharray="4" markerEnd="url(#arrow)" />
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#2e266d" />
              </marker>
            </defs>
          </svg>
          
          <h3 className="font-serif text-xl mb-2 text-deep-blue">Personalizado para cada uso</h3>
          <p className="text-xs text-graphite/70 uppercase tracking-tighter">Projetamos cada detalhe para otimizar sua experiência diária.</p>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

const Features = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <RevealOnScroll className="text-center mb-16">
        <h2 className="font-serif text-4xl text-deep-blue mb-4">Móveis Planejados com Qualidade Superior</h2>
        <div className="h-1 w-20 bg-deep-blue mx-auto"></div>
      </RevealOnScroll>
      <div className="grid md:grid-cols-3 gap-12">
        {[
          {
            title: "Marcenaria sob medida focada no uso",
            desc: "Nossos projetos em Campinas e Hortolândia priorizam a funcionalidade. Cada solução é desenhada para organizar e facilitar sua rotina.",
            icon: <Search size={32} />
          },
          {
            title: "Qualidade e Viabilidade Técnica",
            desc: "Trabalhamos com materiais de alta resistência MDFs Arauco, Berneck, Flora, Guararapes entre outros, equilibrando durabilidade e um investimento otimizado.",
            icon: <CheckCircle2 size={32} />
          },
          {
            title: "Execução Técnica Especializada",
            desc: "Nossa equipe garante uma instalação precisa de móveis planejados, respeitando os prazos e a organização do seu imóvel na região.",
            icon: <Hammer size={32} />
          }
        ].map((item, i) => (
          <RevealOnScroll key={i} className={`flex flex-col items-center text-center p-8 stagger-${i+1}`}>
            <div className="mb-6 bg-sand p-4 rounded-full text-deep-blue shadow-inner">
              {item.icon}
            </div>
            <h3 className="font-serif text-2xl mb-4 text-deep-blue">{item.title}</h3>
            <p className="text-graphite">{item.desc}</p>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

const ProcessStep: React.FC<StepProps> = ({ number, title, description, icon, isLast }) => (
  <div className="relative flex flex-col items-center text-center px-4 group flex-1">
    {!isLast && (
      <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-[1px] bg-deep-blue/20 z-0">
        <div className="absolute right-0 top-[-2px] w-1.5 h-1.5 rounded-full bg-deep-blue/20"></div>
      </div>
    )}
    
    <div className="flex-shrink-0 w-20 h-20 rounded-full bg-white border border-deep-blue/10 text-deep-blue flex items-center justify-center mb-6 z-10 shadow-sm group-hover:border-deep-blue group-hover:bg-deep-blue group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-1">
      <div className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-deep-blue text-white flex items-center justify-center text-[10px] font-bold shadow-md group-hover:bg-sand group-hover:text-deep-blue transition-colors">
        {number}
      </div>
      {icon}
    </div>
    <div className="max-w-[200px]">
      <h4 className="font-serif text-lg mb-3 text-deep-blue group-hover:tracking-wide transition-all duration-300">{title}</h4>
      <p className="text-[11px] text-graphite/80 leading-relaxed">{description}</p>
    </div>
  </div>
);

const Process = () => (
  <section id="processo" className="py-24 bg-sand overflow-hidden">
    <div className="container mx-auto px-6">
      <RevealOnScroll className="text-center mb-24">
        <h2 className="font-serif text-4xl text-deep-blue mb-4">Como trabalhamos</h2>
        <div className="h-1 w-20 bg-deep-blue mx-auto mb-6"></div>
        <p className="text-graphite max-w-xl mx-auto">Nosso processo é pensado para dar clareza, segurança e controle em cada etapa, desde o briefing até a montagem final.</p>
      </RevealOnScroll>
      
      <div className="flex flex-col lg:flex-row lg:justify-between gap-y-16 lg:gap-y-0 relative">
        <RevealOnScroll className="stagger-1 flex flex-1"><ProcessStep number="1" icon={<MessageSquare size={28} />} title="Briefing e levantamento técnico" description="Entendimento profundo da sua necessidade e levantamento técnico preciso do ambiente." /></RevealOnScroll>
        <RevealOnScroll className="stagger-2 flex flex-1"><ProcessStep number="2" icon={<Layout size={28} />} title="Projeto detalhado e alinhamento" description="Desenvolvimento do projeto de móveis planejados com foco total no cliente." /></RevealOnScroll>
        <RevealOnScroll className="stagger-3 flex flex-1"><ProcessStep number="3" icon={<Factory size={28} />} title="Produção homologada" description="Produção industrial com fornecedores homologados para garantir qualidade superior." /></RevealOnScroll>
        <RevealOnScroll className="stagger-4 flex flex-1"><ProcessStep number="4" icon={<Truck size={28} />} title="Execução e acompanhamento" description="Montagem técnica acompanhada de perto para garantir a perfeição em cada detalhe." isLast /></RevealOnScroll>
      </div>
    </div>
  </section>
);

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title }) => (
  <RevealOnScroll className="bg-white border border-sand p-8 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col items-center">
    <div className="text-deep-blue group-hover:scale-110 transition-transform mb-6">
      {icon}
    </div>
    <h3 className="font-serif text-xl text-deep-blue">{title}</h3>
  </RevealOnScroll>
);

const Services = () => (
  <section id="servicos" className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <RevealOnScroll className="text-center mb-16">
        <h2 className="font-serif text-4xl text-deep-blue mb-4">Marcenaria para todos os ambientes</h2>
        <p className="text-graphite">Soluções de móveis planejados que valorizam e otimizam cada m² em Campinas, Hortolândia e região.</p>
      </RevealOnScroll>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <ServiceCard icon={<ChefHat size={40} />} title="Cozinhas" />
        <ServiceCard icon={<User size={40} />} title="Dormitórios" />
        <ServiceCard icon={<Bath size={40} />} title="Banheiros" />
        <ServiceCard icon={<Briefcase size={40} />} title="Home Office" />
        <ServiceCard icon={<Monitor size={40} />} title="Salas & TV" />
        <ServiceCard icon={<Layout size={40} />} title="Lavanderia" />
      </div>
    </div>
  </section>
);

const StudyCard: React.FC<StudyCardProps> = ({ title, description }) => (
  <RevealOnScroll className="group relative overflow-hidden bg-white shadow-lg rounded-sm">
    <div className="aspect-video bg-sand flex items-center justify-center p-8 overflow-hidden">
      <div className="w-full h-full border border-deep-blue/10 flex items-center justify-center relative">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#2e266d_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="w-2/3 h-2/3 border-2 border-deep-blue/20 rotate-12 flex items-center justify-center">
          <div className="w-2/3 h-2/3 border-2 border-deep-blue/40 -rotate-6"></div>
        </div>
        <div className="absolute top-4 right-4 bg-deep-blue text-white text-[10px] px-2 py-1 uppercase tracking-widest font-bold">
          Estudo Conceitual
        </div>
      </div>
    </div>
    <div className="p-6">
      <h3 className="font-serif text-xl text-deep-blue mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </RevealOnScroll>
);

const Studies = () => (
  <section id="estudos" className="py-24 bg-sand">
    <div className="container mx-auto px-6">
      <RevealOnScroll className="text-center mb-16">
        <h2 className="font-serif text-4xl text-deep-blue mb-4">Estudos de Projeto Sob Medida</h2>
        <p className="text-graphite max-w-2xl mx-auto">Confira nossa visão criativa para diferentes espaços. Estes projetos exemplificam a versatilidade que podemos planejar para você na região de Hortolândia.</p>
      </RevealOnScroll>
      <div className="grid md:grid-cols-3 gap-8">
        <StudyCard title="Cozinha Integrada" description="Uso de texturas naturais para criar um ambiente acolhedor e funcional." />
        <StudyCard title="Espaço de Trabalho" description="Otimização inteligente para máxima produtividade em metragens reduzidas." />
        <StudyCard title="Organização Inteligente" description="Sistemas de armazenamento discretos que valorizam a amplitude do ambiente." />
      </div>
    </div>
  </section>
);

const TestimonialCard = ({ content, author }: { content: string; author: string }) => (
  <RevealOnScroll className="bg-white p-10 border-l-4 border-deep-blue shadow-sm">
    <div className="mb-6 text-deep-blue opacity-20">
      <MessageSquare size={48} />
    </div>
    <p className="text-lg text-graphite italic mb-8 leading-relaxed">"{content}"</p>
    <div>
      <p className="font-bold text-deep-blue">{author}</p>
      <p className="text-sm text-gray-400">Cliente Satisfeito</p>
    </div>
  </RevealOnScroll>
);

const Testimonials = () => (
  <section id="depoimentos" className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <RevealOnScroll className="text-center mb-16">
        <h2 className="font-serif text-4xl text-deep-blue mb-4">Depoimentos sobre nossa Marcenaria</h2>
        <p className="text-graphite">O que nossos clientes de Campinas e Hortolândia dizem sobre nossa atenção e entrega.</p>
      </RevealOnScroll>
      <div className="grid md:grid-cols-3 gap-8">
        <TestimonialCard 
          content="Fiquei impressionada com o quanto ouviram minhas necessidades. A cozinha planejada ficou perfeita para o meu dia a dia." 
          author="Ana Paula S."
        />
        <TestimonialCard 
          content="Entrega organizada e montagem técnica. O planejamento detalhado ajudou a entender tudo antes de iniciar." 
          author="Marcos Oliveira"
        />
        <TestimonialCard 
          content="Todo o suporte necessário foi oferecido. Do primeiro desenho à instalação sob medida, houve total transparência." 
          author="Juliana Costa"
        />
      </div>
    </div>
  </section>
);

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-sand">
      <button 
        className="w-full py-6 flex justify-between items-center text-left hover:text-deep-blue transition-colors focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium">{question}</span>
        <ChevronDown size={20} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="text-gray-500 leading-relaxed whitespace-pre-line">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => (
  <section className="py-24 bg-sand">
    <div className="container mx-auto px-6 max-w-3xl">
      <RevealOnScroll className="text-center mb-16">
        <h2 className="font-serif text-4xl text-deep-blue mb-4">Dúvidas Comuns</h2>
      </RevealOnScroll>
      <div className="bg-white p-8 md:p-12 shadow-sm">
        <FAQItem 
          question="Quais são os prazos médios de entrega?" 
          answer="Em média, entregamos e montamos em até 45 dias após a aprovação do projeto executivo. Nosso compromisso é com a pontualidade para o seu planejamento."
        />
        <FAQItem 
          question="O design funcional está incluso?" 
          answer="Sim, o planejamento funcional faz parte da nossa entrega. Desenhamos pensando na melhor circulação e aproveitamento do seu espaço."
        />
        <FAQItem 
          question="Quais as formas de pagamento?" 
          answer={"Oferecemos opções flexíveis para viabilizar seu projeto:\n• 10% de desconto para pagamentos via Pix\n• 5x no cartão de crédito sem juros\n• De 5x a 12x no cartão com incidência de taxas da operadora da maquininha."}
        />
        <FAQItem 
          question="Como funciona a garantia?" 
          answer="Oferecemos 5 anos de garantia estrutural e suporte contínuo para qualquer ajuste que se faça necessário após a instalação."
        />
        <FAQItem 
          question="Atendem quais regiões?" 
          answer="Atendemos as regiões de Hortolândia, Campinas, Sumaré, Monte Mor, Valinhos e Americana, levando nossas soluções de marcenaria planejada com excelência técnica."
        />
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contato" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <RevealOnScroll>
              <h2 className="font-serif text-4xl text-deep-blue mb-6">Inicie seu planejamento em Campinas ou Hortolândia</h2>
              <p className="text-graphite mb-12">Estamos à disposição para ouvir sua ideia e transformá-la em um projeto de marcenaria sob medida viável e funcional.</p>
            </RevealOnScroll>
            
            <RevealOnScroll className="stagger-1 space-y-6">
              <div className="flex items-center gap-4 text-deep-blue">
                <div className="bg-sand p-3 rounded-full"><Phone size={24} /></div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold opacity-50">Contato Direto</p>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-xl font-medium hover:underline">WhatsApp Cavallaro</a>
                </div>
              </div>
              <div className="flex items-center gap-4 text-deep-blue">
                <div className="bg-sand p-3 rounded-full"><Instagram size={24} /></div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold opacity-50">Redes Sociais</p>
                  <a href="https://www.instagram.com/cavallaro.marcenaria/" target="_blank" rel="noopener noreferrer" className="text-xl font-medium hover:underline transition-all">@cavallaro.marcenaria</a>
                </div>
              </div>
              <div className="flex items-center gap-4 text-deep-blue">
                <div className="bg-sand p-3 rounded-full"><PencilRuler size={24} /></div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold opacity-50">Localização</p>
                  <p className="text-xl font-medium">Hortolândia, Campinas e região</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll className="stagger-2 bg-sand p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-deep-blue mb-2 uppercase tracking-wide">Seu Nome</label>
                  <input required id="name" type="text" className="w-full px-4 py-3 bg-white border border-transparent focus:border-deep-blue focus:outline-none transition-all" />
                </div>
                <div>
                  <label htmlFor="contact" className="block text-sm font-bold text-deep-blue mb-2 uppercase tracking-wide">Telefone / WhatsApp</label>
                  <input required id="contact" type="text" className="w-full px-4 py-3 bg-white border border-transparent focus:border-deep-blue focus:outline-none transition-all" />
                </div>
              </div>
              <div>
                <label htmlFor="room" className="block text-sm font-bold text-deep-blue mb-2 uppercase tracking-wide">Qual o seu interesse?</label>
                <select id="room" className="w-full px-4 py-3 bg-white border border-transparent focus:border-deep-blue focus:outline-none transition-all">
                  <option>Cozinha</option>
                  <option>Dormitório / Closet</option>
                  <option>Banheiro</option>
                  <option>Sala / TV</option>
                  <option>Home Office</option>
                  <option>Outros</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-deep-blue mb-2 uppercase tracking-wide">Conte sobre o seu espaço</label>
                <textarea id="message" rows={4} className="w-full px-4 py-3 bg-white border border-transparent focus:border-deep-blue focus:outline-none transition-all" placeholder="Ex: Preciso planejar os armários da cozinha do meu novo apartamento em Hortolândia."></textarea>
              </div>
              
              {status === 'success' ? (
                <div className="bg-green-100 text-green-700 p-4 font-medium flex items-center gap-2">
                  <CheckCircle2 size={20} /> Recebemos sua mensagem! Retornaremos via WhatsApp em breve.
                </div>
              ) : (
                <button type="submit" className="w-full bg-deep-blue text-white py-4 font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                  {CTA_TEXT} <Send size={18} />
                </button>
              )}
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-deep-blue text-sand py-16">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <div className="flex items-center gap-4 text-center md:text-left">
          <Logo className="w-16 h-16" variant="light" />
          <div>
            <h2 className="font-serif text-3xl font-bold mb-1">Cavallaro</h2>
            <p className="opacity-60 text-xs uppercase tracking-widest font-sans font-light">Marcenaria Sob Medida</p>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex gap-8">
            <a href="#inicio" className="text-sm hover:opacity-100 opacity-60 transition-opacity">Início</a>
            <a href="#servicos" className="text-sm hover:opacity-100 opacity-60 transition-opacity">Serviços</a>
            <a href="#processo" className="text-sm hover:opacity-100 opacity-60 transition-opacity">Processo</a>
            <a href="#contato" className="text-sm hover:opacity-100 opacity-60 transition-opacity">Contato</a>
          </div>
          <div className="flex gap-4">
            <a 
              href="https://www.instagram.com/cavallaro.marcenaria/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform opacity-60 hover:opacity-100"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-40 gap-4">
        <p>© {new Date().getFullYear()} Cavallaro Marcenaria. Móveis Planejados Sob Medida.</p>
        <p>Atendimento especializado em Campinas, Hortolândia e região.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="relative">
      <Header />
      <main>
        <Hero />
        <Features />
        <Process />
        <Services />
        <Studies />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      
      {/* Floating WhatsApp Action */}
      <a 
        href={WHATSAPP_LINK} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center"
        aria-label="Solicitar orçamento no WhatsApp"
      >
        <Phone size={24} />
      </a>
    </div>
  );
}
