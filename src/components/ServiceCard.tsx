import React from 'react';
import { 
  PackageSearch, 
  FileText, 
  HardDrive,
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter, 
  Share2, 
  ExternalLink, 
  Workflow, 
  Sparkles,
  Edit3,
  FolderOpen
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  onOpenWorkflow: (service: ServiceItem) => void;
  isAdmin?: boolean;
  onEditLink?: (service: ServiceItem) => void;
  onOpenGDriveMenu?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  onOpenWorkflow,
  isAdmin = false,
  onEditLink,
  onOpenGDriveMenu
}) => {
  // Helper to pick the matching Lucide icon
  const renderIcon = () => {
    const iconClass = "w-4 h-4 sm:w-6 sm:h-6";
    switch (service.icon) {
      case 'PackageSearch':
        return <PackageSearch className={iconClass} />;
      case 'FileText':
        return <FileText className={iconClass} />;
      case 'HardDrive':
        return <HardDrive className={iconClass} />;
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
      case 'data-pegawai-gdrive':
        return 'bg-emerald-500/10 text-emerald-600 border border-emerald-200';
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
      className={`group relative flex flex-col justify-between bg-white rounded-xl sm:rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        service.featured 
          ? 'border-blue-200 shadow-xs sm:shadow-md ring-1 ring-blue-500/10 hover:border-amber-400' 
          : 'border-slate-200 shadow-2xs sm:shadow-xs hover:border-blue-300 hover:shadow-blue-900/5'
      }`}
    >
      {/* Top accent bar for featured cards */}
      {service.featured && (
        <div className="h-1 sm:h-1.5 w-full bg-gradient-to-r from-[#0F2C59] via-blue-600 to-amber-400 rounded-t-xl sm:rounded-t-2xl" />
      )}

      <div className="p-3.5 sm:p-6">
        {/* Header with Icon and Badge */}
        <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2.5 sm:mb-4">
          <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 duration-200 ${getIconBackground()}`}>
            {renderIcon()}
          </div>

          <div className="flex flex-col items-end gap-1">
            {service.badge ? (
              <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-bold rounded-full border ${service.badgeColor || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                {service.badge}
              </span>
            ) : null}
            {service.featured && (
              <span className="hidden xs:flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
                <Sparkles className="w-2.5 h-2.5" />
                <span className="hidden sm:inline">Layanan </span>Unggulan
              </span>
            )}
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="mb-2 sm:mb-3">
          <h3 className="text-sm sm:text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug line-clamp-2">
            {service.title}
          </h3>
          {service.subTitle && (
            <p className="text-[10.5px] sm:text-xs font-medium text-slate-500 mt-0.5 line-clamp-1">
              {service.subTitle}
            </p>
          )}
        </div>

        {/* Description - Compact on mobile */}
        <p className="text-[11px] sm:text-sm text-slate-600 leading-normal sm:leading-relaxed line-clamp-2 sm:line-clamp-4 mb-2.5 sm:mb-4">
          {service.description}
        </p>

        {/* Tags - Hidden on small mobile to reduce scroll height */}
        <div className="hidden sm:flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 mb-2">
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
      <div className="p-3.5 pt-0 sm:p-6 sm:pt-0 mt-auto">
        {service.id === 'data-pegawai-gdrive' ? (
          <button
            type="button"
            onClick={onOpenGDriveMenu}
            className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-xs hover:shadow transition-all group-hover:ring-2 group-hover:ring-emerald-400/40 cursor-pointer"
          >
            <FolderOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-200 shrink-0" />
            <span className="truncate">Pilih Menu Folder Dokumen Pegawai</span>
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-auto shrink-0 text-emerald-200" />
          </button>
        ) : (
          <a
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0F2C59] hover:bg-[#1E3E62] shadow-xs hover:shadow transition-all group-hover:ring-2 group-hover:ring-sky-400/40"
          >
            <span className="truncate">{service.actionText}</span>
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-auto shrink-0 text-sky-300" />
          </a>
        )}

        {/* Admin Edit Link Button */}
        {isAdmin && (
          <button
            type="button"
            onClick={() => onEditLink?.(service)}
            className="w-full mt-1.5 sm:mt-2.5 py-1 sm:py-1.5 px-2.5 sm:px-3 rounded-lg sm:rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            title="Edit Tautan (Khusus Admin)"
          >
            <Edit3 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-700 shrink-0" />
            <span className="truncate">
              Edit Tautan {service.category === 'pegawai' ? 'Drive' : service.category === 'sosmed' ? 'Medsos' : 'Sistem'}
            </span>
          </button>
        )}

        {isInternalWorkflow && (
          <button
            type="button"
            onClick={() => onOpenWorkflow(service)}
            className="w-full mt-1.5 sm:mt-2 py-0.5 sm:py-1 text-center text-[10.5px] sm:text-[11px] font-medium text-slate-500 hover:text-[#0F2C59] hover:underline flex items-center justify-center gap-1 sm:gap-1.5 transition-colors"
          >
            <Workflow className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">Alur SOP &amp; Simulasi</span>
          </button>
        )}
      </div>
    </div>
  );
};
