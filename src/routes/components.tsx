import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Box,
  CheckCircle,
  Layers,
  Palette,
  Search,
  Zap,
} from "lucide-react";
import { Button } from "@base-ui-components/react/button";

export const Route = createFileRoute("/components")({
  component: ComponentsGallery,
});

interface Component {
  id: string;
  name: string;
  description: string;
  category: "form" | "layout" | "feedback" | "navigation" | "overlay";
  icon: React.ReactNode;
  status: "stable" | "beta" | "experimental";
}

const components: Component[] = [
  {
    id: "button",
    name: "Button",
    description:
      "クリック可能なボタンコンポーネント。様々なサイズとスタイルをサポート。",
    category: "form",
    icon: <Zap className="w-6 h-6" />,
    status: "stable",
  },
  {
    id: "input",
    name: "Input",
    description:
      "テキスト入力フィールド。バリデーションとエラーハンドリングをサポート。",
    category: "form",
    icon: <Box className="w-6 h-6" />,
    status: "stable",
  },
  {
    id: "dialog",
    name: "Dialog",
    description: "モーダルダイアログ。フォーカス管理とアクセシビリティを内蔵。",
    category: "overlay",
    icon: <Layers className="w-6 h-6" />,
    status: "stable",
  },
  {
    id: "tabs",
    name: "Tabs",
    description:
      "タブナビゲーション。キーボード操作とアクセシビリティをサポート。",
    category: "navigation",
    icon: <Layers className="w-6 h-6" />,
    status: "stable",
  },
  {
    id: "select",
    name: "Select",
    description:
      "ドロップダウン選択コンポーネント。検索とフィルタリング機能付き。",
    category: "form",
    icon: <Box className="w-6 h-6" />,
    status: "beta",
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "折りたたみ可能なコンテンツセクション。アニメーション付き。",
    category: "layout",
    icon: <Layers className="w-6 h-6" />,
    status: "stable",
  },
  {
    id: "alert-dialog",
    name: "Alert Dialog",
    description: "確認や警告を表示するダイアログ。アクセシビリティ重視。",
    category: "feedback",
    icon: <CheckCircle className="w-6 h-6" />,
    status: "stable",
  },
  {
    id: "menu",
    name: "Menu",
    description:
      "ドロップダウンメニュー。サブメニューとキーボード操作をサポート。",
    category: "navigation",
    icon: <Layers className="w-6 h-6" />,
    status: "stable",
  },
];

const categories = {
  form: "フォーム",
  layout: "レイアウト",
  feedback: "フィードバック",
  navigation: "ナビゲーション",
  overlay: "オーバーレイ",
};

const statusColors = {
  stable: "bg-green-500/20 text-green-400 border-green-500/50",
  beta: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
  experimental: "bg-purple-500/20 text-purple-400 border-purple-500/50",
};

function ComponentsGallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredComponents = components.filter((component) => {
    const matchesSearch =
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" ||
      component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryCounts = components.reduce(
    (acc, comp) => {
      acc[comp.category] = (acc[comp.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10">
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Palette className="w-16 h-16 text-cyan-400" />
            <h1 className="text-6xl md:text-7xl font-black text-white tracking-[-0.08em]">
              <span className="text-gray-300">BASE</span>{" "}
              <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                UI
              </span>
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
            ヘッドレスUIコンポーネントライブラリ
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Base UIは、スタイルなしのアクセシブルなコンポーネントを提供します。
            完全にカスタマイズ可能で、任意のデザインシステムに統合できます。
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="px-6 max-w-7xl mx-auto mb-8">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="コンポーネントを検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full bg-slate-700 text-white border border-slate-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === "all"
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                  }`}
                >
                  すべて ({components.length})
                </Button>
                {Object.entries(categories).map(([key, label]) => (
                  <Button
                    type="button"
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === key
                        ? "bg-cyan-600 text-white"
                        : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                    }`}
                  >
                    {label} ({categoryCounts[key] || 0})
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Components Grid */}
      <section className="px-6 max-w-7xl mx-auto pb-20">
        {filteredComponents.length === 0
          ? (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
              <p className="text-xl text-gray-400">
                該当するコンポーネントが見つかりませんでした
              </p>
            </div>
          )
          : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredComponents.map((component) => (
                <Link
                  key={component.id}
                  to="/components/$componentId"
                  params={{ componentId: component.id }}
                  className="group"
                >
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                        {component.icon}
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold border ${
                          statusColors[component.status]
                        }`}
                      >
                        {component.status === "stable"
                          ? "安定版"
                          : component.status === "beta"
                          ? "ベータ"
                          : "実験的"}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {component.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                      {component.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700">
                      <span className="text-xs text-gray-500">
                        {categories[component.category]}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
      </section>
    </div>
  );
}
