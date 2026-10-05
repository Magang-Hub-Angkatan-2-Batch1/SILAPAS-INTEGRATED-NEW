import React from 'react';
import { 
  PackageSearch, 
  FileText, 
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter, 
  Share2, 
  ExternalLink, 
  Workflow, 
  Sparkles
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  onOpenWorkflow: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onOpenWorkflow }) => {
  // Helper to pick the matching Lucide icon
  const renderIcon = () => {
    const iconClass = "w-6 h-6";
    switch (service.icon) {
      case 'PackageSearch':
        return <PackageSearch className={iconClass} />;
      case 'FileText':
        return <FileText className={iconClass} />;
      case 'Instagram':
        return <Instagram className={iconClass} />;
      case 'Facebook':
        return <Facebook className={iconClass} />;
      case 'Youtube':
        return <Youtube className={iconClass} />;
      case 'Twitter':
        return <Twitter className={iconClass} />;
      default:
        return <Share2 className={iconClass} />;
    }
  };

  // Color accents based on category and type
  const getIconBackground = () => {
    switch (service.id) {
      case 'bmn-persediaan':
        return 'bg-amber-500/10 text-amber-600 border border-amber-200';
      case 'sdm-jurnal-harian':
        return 'bg-blue-500/10 text-blue-600 border border-blue-200';
      case 'sosmed-instagram':
        return 'bg-pink-500/10 text-pink-600 border border-pink-200';
      case 'sosmed-facebook':
        return 'bg-blue-600/10 text-blue-700 border border-blue-200';
      case 'sosmed-youtube':
        return 'bg-red-500/10 text-red-600 border border-red-200';
      case 'sosmed-twitter':
        return 'bg-slate-700/10 text-slate-800 border border-slate-300';
      case 'sosmed-tiktok':
        return 'bg-neutral-800/10 text-neutral-900 border border-neutral-300';
      default:
        return 'bg-sky-500/10 text-sky-600 border border-sky-200';
    }
  };

  const isInternalWorkflow = service.hasWorkflow;

  return (
    <div 
      className={`group relative flex flex-col justify-between bg-white rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
        service.featured 
          ? 'border-blue-200 shadow-md ring-1 ring-blue-500/10 hover:border-amber-400' 
          : 'border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-blue-900/5'
      }`}
    >
      {/* Top accent bar for featured cards */}
      {service.featured && (
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0F2C59] via-blue-600 to-amber-400 rounded-t-2xl" />
      )}

      <div className="p-6">
        {/* Header with Icon and Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className={`p-3 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-200 ${getIconBackground()}`}>
            {renderIcon()}
          </div>

          <div className="flex flex-col items-end gap-1">
            {service.badge ? (
              <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full border ${service.badgeColor || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                {service.badge}
              </span>
            ) : null}
            {service.featured && (
              <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                <Sparkles className="w-2.5 h-2.5" />
                Layanan Unggulan
              </span>
            )}
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
            {service.title}
          </h3>
          {service.subTitle && (
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              {service.subTitle}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4 mb-4">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 mb-2">
          {service.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="text-[10px] font-medium text-slate-500 bg-slate-100/90 px-2 py-0.5 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Action Buttons */}
      <div className="p-6 pt-0 mt-auto">
        <a
          href={service.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0F2C59] hover:bg-[#1E3E62] shadow-sm hover:shadow transition-all group-hover:ring-2 group-hover:ring-sky-400/40"
        >
          <span>{service.actionText}</span>
          <ExternalLink className="w-4 h-4 ml-auto text-sky-300" />
        </a>

        {isInternalWorkflow && (
          <button
            type="button"
            onClick={() => onOpenWorkflow(service)}
            className="w-full mt-2 py-1 text-center text-[11px] font-medium text-slate-500 hover:text-[#0F2C59] hover:underline flex items-center justify-center gap-1.5 transition-colors"
          >
            <Workflow className="w-3.5 h-3.5 text-amber-600" />
            <span>Lihat Alur SOP &amp; Simulasi</span>
          </button>
        )}
      </div>
    </div>
  );
};
