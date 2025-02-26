// 基础 API 请求函数
export async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.descidata.org"
  const url = `${apiUrl}${endpoint}`

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const response = await fetch(url, { ...defaultOptions, ...options })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || `API 请求失败: ${response.status}`)
  }

  return response.json()
}

// 实验相关 API
export const experimentsAPI = {
  // 获取所有实验
  getAll: () => fetchAPI<any[]>("/experiments"),

  // 获取单个实验详情
  getById: (id: string) => fetchAPI<any>(`/experiments/${id}`),

  // 创建新实验
  create: (data: any) =>
    fetchAPI<any>("/experiments", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // 更新实验
  update: (id: string, data: any) =>
    fetchAPI<any>(`/experiments/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // 上传实验数据
  uploadData: (experimentId: string, data: FormData) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/experiments/${experimentId}/data`, {
      method: "POST",
      body: data, // FormData 不需要设置 Content-Type，浏览器会自动设置
    }).then((res) => {
      if (!res.ok) throw new Error("上传失败")
      return res.json()
    })
  },
}

// 数据集相关 API
export const datasetsAPI = {
  getAll: () => fetchAPI<any[]>("/datasets"),
  getById: (id: string) => fetchAPI<any>(`/datasets/${id}`),
  // 其他数据集相关方法...
}

// 用户相关 API
export const usersAPI = {
  getProfile: () => fetchAPI<any>("/users/profile"),
  updateProfile: (data: any) =>
    fetchAPI<any>("/users/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  // 其他用户相关方法...
}

