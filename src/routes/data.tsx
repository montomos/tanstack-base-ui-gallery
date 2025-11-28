import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Database,
  Edit,
  FileText,
  Filter,
  Plus,
  Search,
  Trash2,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Button } from '@base-ui-components/react/button'

export const Route = createFileRoute('/data')({
  component: DataApp,
})

interface DataItem {
  id: string
  name: string
  category: string
  value: number
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
}

// モックデータ
const mockData: Array<DataItem> = [
  {
    id: '1',
    name: 'プロジェクトA',
    category: '開発',
    value: 125000,
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'プロジェクトB',
    category: 'マーケティング',
    value: 85000,
    status: 'active',
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'プロジェクトC',
    category: '開発',
    value: 200000,
    status: 'pending',
    createdAt: '2024-03-10',
  },
  {
    id: '4',
    name: 'プロジェクトD',
    category: 'サポート',
    value: 45000,
    status: 'inactive',
    createdAt: '2024-01-05',
  },
  {
    id: '5',
    name: 'プロジェクトE',
    category: '開発',
    value: 175000,
    status: 'active',
    createdAt: '2024-03-25',
  },
]

async function fetchDataItems(): Promise<Array<DataItem>> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockData
}

async function deleteDataItem(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300))
}

function DataApp() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const queryClient = useQueryClient()

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['data-items'],
    queryFn: fetchDataItems,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteDataItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data-items'] })
    },
  })

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = Array.from(new Set(items.map((item) => item.category)))
  const totalValue = filteredItems.reduce((sum, item) => sum + item.value, 0)
  const activeCount = filteredItems.filter((item) => item.status === 'active').length

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-black text-white mb-4 flex items-center gap-4">
            <Database className="w-12 h-12 text-cyan-400" />
            <span>
              <span className="text-gray-300">インタラクティブ</span>{' '}
              <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                データ管理
              </span>
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            TanStack Queryを使ったリアルタイムデータ操作
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-linear-to-br from-cyan-600 to-blue-600 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100 text-sm mb-2">総数</p>
                <p className="text-3xl font-bold text-white">{filteredItems.length}</p>
              </div>
              <FileText className="w-12 h-12 text-white/50" />
            </div>
          </div>
          <div className="bg-linear-to-br from-green-600 to-emerald-600 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm mb-2">アクティブ</p>
                <p className="text-3xl font-bold text-white">{activeCount}</p>
              </div>
              <Users className="w-12 h-12 text-white/50" />
            </div>
          </div>
          <div className="bg-linear-to-br from-purple-600 to-pink-600 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm mb-2">総価値</p>
                <p className="text-3xl font-bold text-white">
                  ¥{totalValue.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-white/50" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full bg-slate-700 text-white border border-slate-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-700 text-white border border-slate-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">すべてのカテゴリ</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-700 text-white border border-slate-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">すべてのステータス</option>
              <option value="active">アクティブ</option>
              <option value="inactive">非アクティブ</option>
              <option value="pending">保留中</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-300">データを読み込み中...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      名前
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      カテゴリ
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      価値
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      ステータス
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      作成日
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-white">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-white font-medium">{item.name}</td>
                      <td className="px-6 py-4 text-gray-300">{item.category}</td>
                      <td className="px-6 py-4 text-cyan-400 font-semibold">
                        ¥{item.value.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === 'active'
                              ? 'bg-green-500/20 text-green-400'
                              : item.status === 'pending'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {item.status === 'active'
                            ? 'アクティブ'
                            : item.status === 'pending'
                              ? '保留中'
                              : '非アクティブ'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{item.createdAt}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                            title="編集"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => deleteMutation.mutate(item.id)}
                            disabled={deleteMutation.isPending}
                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50"
                            title="削除"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredItems.length === 0 && (
                <div className="p-12 text-center text-gray-400">
                  <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>該当するデータが見つかりませんでした</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Add Button */}
        <div className="mt-6 flex justify-end">
          <Button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg flex items-center gap-2">
            <Plus className="w-5 h-5" />
            新しいアイテムを追加
          </Button>
        </div>
      </div>
    </div>
  )
}

