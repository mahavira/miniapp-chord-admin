export const ENV = process.env.NODE_ENV
export const API_HOST = ENV === 'development' ? 'http://localhost:8080/' : 'https://898269075.ssjedcw.club/'
export const API_BASE_PATH = ENV === 'development' ? '' : ''

export default {
  ENV,
  API_HOST,
  API_BASE_PATH
}
