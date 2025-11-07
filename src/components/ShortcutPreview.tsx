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

  const themeClasses = {
    minimal: {
      container: "bg-white",
      title: "text-gray-900 font-normal border-b border-gray-300 pb-3",
      category: "text-gray-700 text-sm font-medium mt-4 mb-2",
      shortcut: "border-b border-gray-100 py-2",
      key: "bg-gray-100 text-gray-800 border border-gray-300",
      description: "text-gray-700",
    },
    modern: {
      container: "bg-gradient-to-br from-blue-50 to-purple-50",
      title: "text-blue-900 font-bold border-b-4 border-blue-500 pb-3",
      category: "text-blue-800 text-sm font-semibold mt-4 mb-2 uppercase tracking-wide",
      shortcut: "bg-white/60 rounded-lg p-2 mb-2 shadow-sm",
      key: "bg-gradient-to-br from-blue-500 to-purple-500 text-white border-0 shadow-sm",
      description: "text-gray-800",
    },
    bold: {
      container: "bg-black",
      title: "text-white font-black border-b-4 border-yellow-400 pb-3",
      category: "text-yellow-400 text-sm font-bold mt-4 mb-2 uppercase tracking-wider",
      shortcut: "border-l-4 border-yellow-400 pl-3 py-2 mb-1",
      key: "bg-yellow-400 text-black border-0 font-bold",
      description: "text-gray-100",
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
      className={`${pageSizeClasses[pageSize]} ${theme_styles.container} shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none`}
      id="printable-area"
    >
      <div className="p-8">
        <h1 className={`text-3xl mb-6 ${theme_styles.title}`}>{title}</h1>

        {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
          <div key={category} className="mb-4">
            <h2 className={theme_styles.category}>{category}</h2>
            <div className="space-y-1">
              {categoryShortcuts.map((shortcut) => (
                <div
                  key={shortcut.id}
                  className={`flex justify-between items-center ${theme_styles.shortcut}`}
                >
                  <div className="flex gap-1.5 items-center min-w-[40%]">
                    {shortcut.keys.map((key, index) => (
                      <span key={index}>
                        <Badge
                          variant="outline"
                          className={`font-mono text-xs px-2 py-0.5 ${theme_styles.key}`}
                        >
                          {key}
                        </Badge>
                        {index < shortcut.keys.length - 1 && (
                          <span className={`mx-1 ${theme === 'bold' ? 'text-gray-400' : 'text-gray-500'}`}>+</span>
                        )}
                      </span>
                    ))}
                  </div>
                  <span className={`text-sm flex-1 text-right ${theme_styles.description}`}>
                    {shortcut.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
