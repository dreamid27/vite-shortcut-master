import type { Shortcut } from "@/data/shortcuts";
import { Badge } from "@/components/ui/badge";

interface ShortcutPreviewProps {
  title: string;
  shortcuts: Shortcut[];
  pageSize: "a4" | "a5" | "a6";
  theme: "minimal" | "modern" | "bold";
}

export function ShortcutPreview({
  title,
  shortcuts,
  pageSize,
  theme,
}: ShortcutPreviewProps) {
  const pageSizeClasses = {
    a4: "w-[210mm] min-h-[297mm]",
    a5: "w-[148mm] min-h-[210mm]",
    a6: "w-[105mm] min-h-[148mm]",
  };

  // Grid columns based on page size
  const gridColumns = {
    a4: "grid-cols-3",
    a5: "grid-cols-2",
    a6: "grid-cols-2",
  };

  const themeClasses = {
    minimal: {
      container: "bg-white",
      header: "bg-gradient-to-r from-gray-900 to-gray-700",
      title: "text-white font-light tracking-wide",
      category: "text-gray-800 text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b-2 border-gray-300",
      categoryContainer: "col-span-full",
      shortcutRow: "py-1 px-2 border-b border-gray-100",
      keyContainer: "flex gap-1 items-center mb-0.5",
      key: "bg-white text-gray-800 border border-gray-300 shadow-sm",
      separator: "text-gray-400 text-xs",
      description: "text-gray-600 text-[10px]",
    },
    modern: {
      container: "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100",
      header: "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600",
      title: "text-white font-bold tracking-tight",
      category: "text-indigo-900 text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b-2 border-indigo-300",
      categoryContainer: "col-span-full",
      shortcutRow: "py-1 px-2 rounded-md bg-white/50 backdrop-blur-sm",
      keyContainer: "flex gap-1 items-center mb-0.5",
      key: "bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-md",
      separator: "text-indigo-400 text-xs font-bold",
      description: "text-slate-700 text-[10px]",
    },
    bold: {
      container: "bg-gradient-to-br from-gray-900 to-black",
      header: "bg-gradient-to-r from-yellow-400 to-orange-500",
      title: "text-black font-black tracking-tight",
      category: "text-yellow-400 text-xs font-black uppercase tracking-widest mb-2 pb-1 border-b-2 border-yellow-400",
      categoryContainer: "col-span-full",
      shortcutRow: "py-1 border-l-4 border-yellow-400 pl-2",
      keyContainer: "flex gap-1 items-center mb-0.5",
      key: "bg-yellow-400 text-black border-0 font-bold shadow-lg shadow-yellow-400/50",
      separator: "text-yellow-500 text-xs font-bold",
      description: "text-gray-200 text-[10px]",
    },
  };

  const theme_styles = themeClasses[theme];

  // Group shortcuts by category
  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, Shortcut[]>);

  return (
    <div
      className={`${pageSizeClasses[pageSize]} ${theme_styles.container} shadow-2xl rounded-xl overflow-hidden print:shadow-none print:rounded-none transition-all`}
      id="printable-area"
    >
      {/* Header */}
      <div className={`${theme_styles.header} px-6 py-4`}>
        <h1 className={`text-2xl ${theme_styles.title}`}>{title}</h1>
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        <div className={`grid ${gridColumns[pageSize]} gap-x-4 gap-y-1`}>
          {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
            <>
              <div key={`${category}-header`} className={theme_styles.categoryContainer}>
                <h2 className={theme_styles.category}>{category}</h2>
              </div>
              {categoryShortcuts.map((shortcut) => (
                <div
                  key={shortcut.id}
                  className={theme_styles.shortcutRow}
                >
                  <div className={theme_styles.keyContainer}>
                    {shortcut.keys.map((key, index) => (
                      <span key={index} className="flex items-center gap-0.5">
                        <Badge
                          variant="outline"
                          className={`font-mono text-[9px] px-1 py-0 leading-tight ${theme_styles.key}`}
                        >
                          {key}
                        </Badge>
                        {index < shortcut.keys.length - 1 && (
                          <span className={theme_styles.separator}>+</span>
                        )}
                      </span>
                    ))}
                  </div>
                  <span className={`${theme_styles.description} leading-tight block`}>
                    {shortcut.description}
                  </span>
                </div>
              ))}
            </>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className={`${theme === 'bold' ? 'bg-gray-900/50' : theme === 'modern' ? 'bg-white/30' : 'bg-gray-50'} px-6 py-2 text-center border-t ${theme === 'bold' ? 'border-gray-800' : theme === 'modern' ? 'border-indigo-200' : 'border-gray-200'}`}>
        <p className={`text-[10px] ${theme === 'bold' ? 'text-gray-500' : theme === 'modern' ? 'text-indigo-600' : 'text-gray-500'}`}>
          Generated with Shortcut Template Generator
        </p>
      </div>
    </div>
  );
}
