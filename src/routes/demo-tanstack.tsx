import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  CheckCircle,
  Code,
  Rocket,
  Route as RouteIcon,
  Server,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react'
import { Button } from '@base-ui-components/react/button'

export const Route = createFileRoute('/demo-tanstack')({
  component: TanStackDemo,
})

// モックデータフェッチ関数
async function fetchData(key: string): Promise<{ data: string; timestamp: number }> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    data: `${key}のデータを取得しました`,
    timestamp: Date.now(),
  }
}

function TanStackDemo() {
  const [selectedTab, setSelectedTab] = useState('router')
  const [counter, setCounter] = useState(0)

  // TanStack Queryのデモ
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['demo-data', selectedTab],
    queryFn: () => fetchData(selectedTab),
    staleTime: 5000,
  })

  const features = [
    {
      id: 'router',
      icon: <RouteIcon className="w-8 h-8 text-cyan-400" />,
      title: 'TanStack Router',
      description: '型安全なファイルベースルーティング',
      code: `import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo')({
  component: DemoComponent,
})`,
    },
    {
      id: 'query',
      icon: <Zap className="w-8 h-8 text-cyan-400" />,
      title: 'TanStack Query',
      description: '強力なデータフェッチングとキャッシング',
      code: `const { data, isLoading } = useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
})`,
    },
    {
      id: 'server',
      icon: <Server className="w-8 h-8 text-cyan-400" />,
      title: 'Server Functions',
      description: '型安全なサーバーサイドロジック',
      code: `export async function serverFunction() {
  return { data: 'from server' }
}`,
    },
    {
      id: 'types',
      icon: <Shield className="w-8 h-8 text-cyan-400" />,
      title: 'End-to-End Type Safety',
      description: 'サーバーからクライアントまで完全な型安全性',
      code: `// 型が自動的に推論されます
const router = createRouter({ routeTree })`,
    },
  ]

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4 flex items-center justify-center gap-4">
            <Rocket className="w-12 h-12 text-cyan-400" />
            <span>
              <span className="text-gray-300">TANSTACK</span>{' '}
              <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                DEMO
              </span>
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            TanStackの強力な機能を体験してください
          </p>
        </div>

        {/* Interactive Counter Demo */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            リアクティブな状態管理
          </h2>
          <div className="flex items-center gap-6">
            <Button
              onClick={() => setCounter((c) => c - 1)}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              -
            </Button>
            <div className="text-4xl font-bold text-white min-w-[100px] text-center">
              {counter}
            </div>
            <Button
              onClick={() => setCounter((c) => c + 1)}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              +
            </Button>
            <Button
              onClick={() => setCounter(0)}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg ml-auto"
            >
              リセット
            </Button>
          </div>
        </div>

        {/* Tabs Demo */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
          <div className="border-b border-slate-700">
            <div className="flex gap-2 p-4">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setSelectedTab(feature.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedTab === feature.id
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {feature.icon}
                    <span className="font-medium">{feature.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {features.map((feature) => (
            <div
              key={feature.id}
              className={selectedTab === feature.id ? 'block' : 'hidden'}
            >
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Feature Info */}
                    <div className="bg-slate-700/50 p-6 rounded-lg">
                      <div className="mb-4">{feature.icon}</div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 mb-4">{feature.description}</p>
                      
                      {/* Query Status */}
                      {feature.id === selectedTab && (
                        <div className="mt-4 p-4 bg-slate-800 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            {isLoading && (
                              <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                            )}
                            {data && (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            )}
                            {isError && (
                              <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                            )}
                            <span className="text-sm text-gray-300">
                              {isLoading
                                ? 'データを取得中...'
                                : data
                                  ? 'データ取得完了'
                                  : 'エラーが発生しました'}
                            </span>
                          </div>
                          {data && (
                            <p className="text-cyan-400 text-sm">
                              {data.data} (取得時刻: {new Date(data.timestamp).toLocaleTimeString()})
                            </p>
                          )}
                          <Button
                            onClick={() => refetch()}
                            className="mt-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm"
                          >
                            再取得
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Code Example */}
                    <div className="bg-slate-900/50 p-6 rounded-lg">
                      <div className="flex items-center gap-2 mb-4">
                        <Code className="w-5 h-5 text-cyan-400" />
                        <h4 className="text-lg font-semibold text-white">コード例</h4>
                      </div>
                      <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto">
                        <code className="text-cyan-300 text-sm">{feature.code}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
