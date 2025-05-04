"use client";

import { useState, useEffect } from 'react';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
});

type Region = 'LatAm' | 'MENA' | 'SEA' | 'Eurasia' | 'Flagship' | 'Korea';
type RequestType = 'Introduction' | 'Mentorship';

interface Company {
  id: number;
  name: string;
  founder: {
    name: string;
    email: string;
  };
  request: {
    title: string;
    oneLiner: string;
    helpRequest: string;
    region: Region;
    type: RequestType;
  };
}

// Dummy data structure that mimics what would come from a database
// In a real implementation, this would be fetched from an API endpoint
const DUMMY_COMPANIES: Company[] = [
  {
    id: 1,
    name: "TechCorp Solutions",
    founder: {
      name: "John Smith",
      email: "john@techcorp.com"
    },
    request: {
      title: "Looking for AI Integration",
      oneLiner: "Building the next generation of AI-powered business solutions to automate complex workflows.",
      helpRequest: "We're seeking technical expertise to implement AI features in our SaaS platform. Specifically, we need help with: 1) Setting up machine learning pipelines, 2) Integrating with existing APIs, and 3) Optimizing our data infrastructure. We have a team of 5 developers but lack AI/ML expertise.",
      region: "LatAm",
      type: "Introduction"
    }
  },
  {
    id: 2,
    name: "Green Energy Innovations",
    founder: {
      name: "Sarah Johnson",
      email: "sarah@greenenergy.com"
    },
    request: {
      title: "Renewable Energy Dashboard",
      oneLiner: "Revolutionizing renewable energy monitoring with real-time data analytics and predictive maintenance.",
      helpRequest: "Our startup needs mentorship in building a scalable monitoring system. We're looking for: 1) Architecture guidance for real-time data processing, 2) Best practices for energy data visualization, and 3) Advice on scaling our infrastructure. We have a working prototype but need expert guidance to scale.",
      region: "MENA",
      type: "Mentorship"
    }
  },
  {
    id: 3,
    name: "HealthTech Plus",
    founder: {
      name: "Michael Chen",
      email: "michael@healthtech.com"
    },
    request: {
      title: "Patient Management System",
      oneLiner: "Transforming healthcare delivery through integrated patient management and telemedicine solutions.",
      helpRequest: "We need help with our patient management platform. Specifically: 1) Integration with existing healthcare systems, 2) Implementation of telemedicine features, and 3) Compliance with healthcare regulations. We have a small team and need technical expertise to move forward.",
      region: "SEA",
      type: "Introduction"
    }
  },
  {
    id: 4,
    name: "FinFlow Analytics",
    founder: {
      name: "Emma Rodriguez",
      email: "emma@finflow.com"
    },
    request: {
      title: "Financial Data Processing Pipeline",
      oneLiner: "Empowering financial institutions with real-time analytics and predictive insights for better decision-making.",
      helpRequest: "We're building a financial data processing platform and need expertise in: 1) High-frequency trading data handling, 2) Real-time analytics implementation, and 3) Financial data security best practices. We have a strong backend but need guidance on scaling our data processing capabilities.",
      region: "Flagship",
      type: "Mentorship"
    }
  },
  {
    id: 5,
    name: "EduTech Solutions",
    founder: {
      name: "David Kim",
      email: "david@edutech.com"
    },
    request: {
      title: "Learning Management System Integration",
      oneLiner: "Creating personalized learning experiences through AI-driven educational technology.",
      helpRequest: "Our platform needs integration with major LMS providers. We're looking for help with: 1) API integration with Canvas and Blackboard, 2) Implementation of SCORM standards, and 3) Development of custom learning analytics. We have the core platform ready but need technical expertise for integrations.",
      region: "Korea",
      type: "Introduction"
    }
  },
  {
    id: 6,
    name: "SupplyChain AI",
    founder: {
      name: "Aisha Patel",
      email: "aisha@supplychainai.com"
    },
    request: {
      title: "Supply Chain Optimization Platform",
      oneLiner: "Revolutionizing supply chain management with AI-powered optimization and predictive analytics.",
      helpRequest: "We need expertise in supply chain optimization algorithms. Specifically looking for help with: 1) Route optimization algorithms, 2) Demand forecasting models, and 3) Inventory management systems. We have a working prototype but need expert guidance to improve our algorithms.",
      region: "Eurasia",
      type: "Mentorship"
    }
  }
];

const REGION_COLORS: Record<Region, string> = {
  LatAm: "bg-[#e6ff32] text-black",
  MENA: "bg-[#e6ff32] text-black",
  SEA: "bg-[#e6ff32] text-black",
  Eurasia: "bg-[#e6ff32] text-black",
  Flagship: "bg-[#e6ff32] text-black",
  Korea: "bg-[#e6ff32] text-black"
};

const TYPE_COLORS: Record<RequestType, string> = {
  Introduction: "bg-[#e6ff32] text-black",
  Mentorship: "bg-[#e6ff32] text-black"
};

export default function CompanyList() {
  const [isClient, setIsClient] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchRegion, setSearchRegion] = useState('');
  const [searchType, setSearchType] = useState('');
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<RequestType[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleIntroRequest = (company: Company) => {
    const subject = encodeURIComponent(`Introduction Request: ${company.request.title}`);
    const body = encodeURIComponent(
      `Hi,\n\n` +
      `I'm interested in connecting with ${company.founder.name} from ${company.name}.\n\n` +
      `Based on their request:\n` +
      `${company.request.helpRequest}\n\n` +
      `I believe I can help with this project and would appreciate an introduction.\n\n` +
      `Best regards,\n` +
      `[Your Name]`
    );
    
    window.location.href = `mailto:${company.founder.email}?subject=${subject}&body=${body}`;
  };

  const toggleRegion = (region: Region) => {
    setSelectedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  const toggleType = (type: RequestType) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedRegions([]);
    setSelectedTypes([]);
    setSearchName('');
    setSearchRegion('');
    setSearchType('');
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f5eb]">
      {/* Enhanced Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-8 md:mb-0">
                <h1 className={`text-5xl font-bold text-[#1A1A1A] tracking-tight mb-4 ${playfair.className}`}>
                  Portfolio B2B Requests - for LPs
                </h1>
                <p className="text-xl text-[#666666] font-light max-w-2xl">
                  Connect with founders seeking help. Browse through requests and find opportunities to make an impact.
                </p>
              </div>
              <div className="flex flex-col space-y-4 w-full md:w-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Name Search */}
                  <div className="relative">
                    <input
                      type="text"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      placeholder="Search by name..."
                      className="w-full px-4 py-3 text-[#1A1A1A] bg-[#F5F5F5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e6ff32] focus:bg-white transition-all duration-200"
                    />
                    <svg
                      className="w-5 h-5 text-[#666666] absolute right-3 top-1/2 transform -translate-y-1/2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>

                  {/* Region Search */}
                  <div className="relative">
                    <select
                      value={searchRegion}
                      onChange={(e) => setSearchRegion(e.target.value)}
                      className="w-full px-4 py-3 text-[#1A1A1A] bg-[#F5F5F5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e6ff32] focus:bg-white transition-all duration-200 appearance-none"
                    >
                      <option value="">All Regions</option>
                      {Object.keys(REGION_COLORS).map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="w-5 h-5 text-[#666666] absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {/* Type Search */}
                  <div className="relative">
                    <select
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                      className="w-full px-4 py-3 text-[#1A1A1A] bg-[#F5F5F5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e6ff32] focus:bg-white transition-all duration-200 appearance-none"
                    >
                      <option value="">All Types</option>
                      {Object.keys(TYPE_COLORS).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="w-5 h-5 text-[#666666] absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#666666] hover:text-[#e6ff32] transition-colors flex items-center space-x-1"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span>Clear filters</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {DUMMY_COMPANIES.map((company) => (
            <div 
              key={company.id} 
              className="bg-white rounded-lg hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-100"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">{company.name}</h2>
                  <span className={`px-4 py-2 text-sm font-medium rounded-full ${TYPE_COLORS[company.request.type]}`}>
                    {company.request.type}
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-base text-[#666666]">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {company.founder.name}
                  </div>
                  <p className="text-base text-[#666666] italic">
                    {company.request.oneLiner}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{company.request.title}</h3>
                  
                  <div className="bg-[#F5F5F5] rounded-lg p-4 mb-6">
                    <h4 className="text-sm font-medium text-[#1A1A1A] mb-2">Help Request:</h4>
                    <p className="text-sm text-[#666666] leading-relaxed">{company.request.helpRequest}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-8">
                    <span className={`px-4 py-2 text-sm font-medium rounded-full ${REGION_COLORS[company.request.region]}`}>
                      {company.request.region}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleIntroRequest(company)}
                  className="w-full bg-[#41a050] text-white px-6 py-4 rounded-lg hover:bg-[#378a45] transition-colors duration-200 flex items-center justify-center gap-3 text-base font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Request Intro
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 