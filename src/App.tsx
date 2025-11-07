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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6 print:hidden">
            <Card>
              <CardHeader>
                <CardTitle>Shortcut Template Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="app">Software</Label>
                  <Select value={selectedApp} onValueChange={setSelectedApp}>
                    <SelectTrigger id="app">
                      <SelectValue placeholder="Select software" />
                    </SelectTrigger>
                    <SelectContent>
                      {shortcutApps.map((app) => (
                        <SelectItem key={app.id} value={app.id}>
                          {app.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pageSize">Page Size</Label>
                  <Select
                    value={pageSize}
                    onValueChange={(value) =>
                      setPageSize(value as "a4" | "a5" | "a6")
                    }
                  >
                    <SelectTrigger id="pageSize">
                      <SelectValue placeholder="Select page size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a4">A4 (210 × 297 mm)</SelectItem>
                      <SelectItem value="a5">A5 (148 × 210 mm)</SelectItem>
                      <SelectItem value="a6">A6 (105 × 148 mm)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={theme}
                    onValueChange={(value) =>
                      setTheme(value as "minimal" | "modern" | "bold")
                    }
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="bold">Bold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 space-y-2">
                  <Button onClick={handlePrint} className="w-full" variant="default">
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Button onClick={handleDownload} className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download HTML
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Shortcuts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <Button onClick={selectAll} variant="outline" size="sm" className="w-full">
                    Select All
                  </Button>
                  <Button onClick={deselectAll} variant="outline" size="sm" className="w-full">
                    Deselect All
                  </Button>
                </div>

                <Tabs defaultValue={Object.keys(groupedShortcuts)[0]} className="w-full">
                  <TabsList className="w-full flex-wrap h-auto">
                    {Object.keys(groupedShortcuts).map((category) => (
                      <TabsTrigger key={category} value={category} className="text-xs">
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {Object.entries(groupedShortcuts).map(([category, shortcuts]) => {
                    const categorySelected = shortcuts.every((s) =>
                      selectedShortcuts.includes(s.id)
                    );
                    const categoryPartial =
                      !categorySelected &&
                      shortcuts.some((s) => selectedShortcuts.includes(s.id));

                    return (
                      <TabsContent key={category} value={category} className="space-y-2">
                        <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded">
                          <Checkbox
                            id={`category-${category}`}
                            checked={categorySelected}
                            onCheckedChange={() => toggleCategory(category)}
                            className={categoryPartial ? "opacity-50" : ""}
                          />
                          <Label
                            htmlFor={`category-${category}`}
                            className="font-semibold cursor-pointer"
                          >
                            {categorySelected ? "Deselect" : "Select"} All {category}
                          </Label>
                        </div>

                        <div className="space-y-2 max-h-[400px] overflow-y-auto">
                          {shortcuts.map((shortcut) => (
                            <div
                              key={shortcut.id}
                              className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded"
                            >
                              <Checkbox
                                id={shortcut.id}
                                checked={selectedShortcuts.includes(shortcut.id)}
                                onCheckedChange={() => toggleShortcut(shortcut.id)}
                              />
                              <Label
                                htmlFor={shortcut.id}
                                className="text-sm cursor-pointer flex-1"
                              >
                                <div className="font-medium">
                                  {shortcut.keys.join(" + ")}
                                </div>
                                <div className="text-gray-500">
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
          <div className="lg:col-span-2 flex justify-center print:block">
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
