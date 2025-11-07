import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ShortcutPreview } from "@/components/ShortcutPreview";
import { shortcutApps } from "@/data/shortcuts";
import type { Shortcut } from "@/data/shortcuts";
import { Printer, Download } from "lucide-react";

function App() {
  const [title, setTitle] = useState("Keyboard Shortcuts");
  const [selectedApp, setSelectedApp] = useState("figma");
  const [pageSize, setPageSize] = useState<"a4" | "a5" | "a6">("a4");
  const [theme, setTheme] = useState<"minimal" | "modern" | "bold">("modern");
  const [selectedShortcuts, setSelectedShortcuts] = useState<string[]>([]);

  const currentApp = shortcutApps.find((app) => app.id === selectedApp);

  // Initialize all shortcuts as selected when app changes
  useMemo(() => {
    if (currentApp) {
      setSelectedShortcuts(currentApp.shortcuts.map((s) => s.id));
    }
  }, [selectedApp, currentApp]);

  const toggleShortcut = (shortcutId: string) => {
    setSelectedShortcuts((prev) =>
      prev.includes(shortcutId)
        ? prev.filter((id) => id !== shortcutId)
        : [...prev, shortcutId]
    );
  };

  const toggleCategory = (category: string) => {
    const categoryShortcuts =
      currentApp?.shortcuts.filter((s) => s.category === category).map((s) => s.id) || [];
    const allSelected = categoryShortcuts.every((id) => selectedShortcuts.includes(id));

    if (allSelected) {
      setSelectedShortcuts((prev) => prev.filter((id) => !categoryShortcuts.includes(id)));
    } else {
      setSelectedShortcuts((prev) => [
        ...new Set([...prev, ...categoryShortcuts]),
      ]);
    }
  };

  const selectAll = () => {
    if (currentApp) {
      setSelectedShortcuts(currentApp.shortcuts.map((s) => s.id));
    }
  };

  const deselectAll = () => {
    setSelectedShortcuts([]);
  };

  const filteredShortcuts: Shortcut[] = useMemo(
    () =>
      currentApp?.shortcuts.filter((s) => selectedShortcuts.includes(s.id)) || [],
    [currentApp, selectedShortcuts]
  );

  // Group shortcuts by category for the checkbox list
  const groupedShortcuts = useMemo(() => {
    if (!currentApp) return {};
    return currentApp.shortcuts.reduce((acc, shortcut) => {
      if (!acc[shortcut.category]) {
        acc[shortcut.category] = [];
      }
      acc[shortcut.category].push(shortcut);
      return acc;
    }, {} as Record<string, Shortcut[]>);
  }, [currentApp]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a downloadable HTML file
    const printArea = document.getElementById("printable-area");
    if (!printArea) return;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 20mm;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    }
    @page {
      size: ${pageSize.toUpperCase()};
      margin: 0;
    }
    @media print {
      body {
        margin: 0;
        padding: 20mm;
      }
    }
  </style>
</head>
<body>
  ${printArea.outerHTML}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}-shortcuts.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-6 print:hidden">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Shortcut Template Generator
          </h1>
          <p className="text-sm text-gray-600 mt-1">Create beautiful printable shortcut sheets</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-4">
          {/* Controls Panel */}
          <div className="space-y-3 print:hidden">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="title" className="text-xs font-medium text-gray-700">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title..."
                    className="h-9 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="app" className="text-xs font-medium text-gray-700">Software</Label>
                    <Select value={selectedApp} onValueChange={setSelectedApp}>
                      <SelectTrigger id="app" className="h-9 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {shortcutApps.map((app) => (
                          <SelectItem key={app.id} value={app.id} className="text-sm">
                            {app.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="pageSize" className="text-xs font-medium text-gray-700">Size</Label>
                    <Select
                      value={pageSize}
                      onValueChange={(value) => setPageSize(value as "a4" | "a5" | "a6")}
                    >
                      <SelectTrigger id="pageSize" className="h-9 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a4" className="text-sm">A4</SelectItem>
                        <SelectItem value="a5" className="text-sm">A5</SelectItem>
                        <SelectItem value="a6" className="text-sm">A6</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="theme" className="text-xs font-medium text-gray-700">Theme</Label>
                  <Select
                    value={theme}
                    onValueChange={(value) => setTheme(value as "minimal" | "modern" | "bold")}
                  >
                    <SelectTrigger id="theme" className="h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal" className="text-sm">✨ Minimal</SelectItem>
                      <SelectItem value="modern" className="text-sm">🎨 Modern</SelectItem>
                      <SelectItem value="bold" className="text-sm">⚡ Bold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button onClick={handlePrint} size="sm" className="h-9 text-xs">
                    <Printer className="mr-1.5 h-3.5 w-3.5" />
                    Print
                  </Button>
                  <Button onClick={handleDownload} size="sm" variant="outline" className="h-9 text-xs">
                    <Download className="mr-1.5 h-3.5 w-3.5" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    Select Shortcuts
                  </CardTitle>
                  <div className="flex gap-1">
                    <Button onClick={selectAll} variant="ghost" size="sm" className="h-6 px-2 text-xs">
                      All
                    </Button>
                    <Button onClick={deselectAll} variant="ghost" size="sm" className="h-6 px-2 text-xs">
                      None
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Tabs defaultValue={Object.keys(groupedShortcuts)[0]} className="w-full">
                  <TabsList className="w-full h-8 p-0.5 bg-gray-100">
                    {Object.keys(groupedShortcuts).map((category) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className="text-xs h-7 data-[state=active]:bg-white"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {Object.entries(groupedShortcuts).map(([category, shortcuts]) => {
                    const categorySelected = shortcuts.every((s) =>
                      selectedShortcuts.includes(s.id)
                    );

                    return (
                      <TabsContent key={category} value={category} className="mt-3 space-y-1">
                        <div className="flex items-center gap-2 px-2 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-100">
                          <Checkbox
                            id={`category-${category}`}
                            checked={categorySelected}
                            onCheckedChange={() => toggleCategory(category)}
                          />
                          <Label
                            htmlFor={`category-${category}`}
                            className="text-xs font-medium cursor-pointer text-blue-900"
                          >
                            {categorySelected ? "Deselect" : "Select"} All
                          </Label>
                        </div>

                        <div className="space-y-0.5 max-h-[calc(100vh-500px)] overflow-y-auto pr-1">
                          {shortcuts.map((shortcut) => (
                            <div
                              key={shortcut.id}
                              className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-md transition-colors group"
                            >
                              <Checkbox
                                id={shortcut.id}
                                checked={selectedShortcuts.includes(shortcut.id)}
                                onCheckedChange={() => toggleShortcut(shortcut.id)}
                              />
                              <Label
                                htmlFor={shortcut.id}
                                className="text-xs cursor-pointer flex-1 leading-tight"
                              >
                                <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {shortcut.keys.join(" + ")}
                                </div>
                                <div className="text-gray-500 text-[11px]">
                                  {shortcut.description}
                                </div>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    );
                  })}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="flex justify-center items-start print:block">
            <ShortcutPreview
              title={title}
              shortcuts={filteredShortcuts}
              pageSize={pageSize}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
