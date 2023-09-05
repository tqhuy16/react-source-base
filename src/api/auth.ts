import mockData from '@/utils/mock-api'

interface ILogin {
  userName: string
  password: string
}

const login = ({ userName, password }: ILogin): Promise<any> => {
  if (userName === 'admin' && password === '123456') {
    return mockData({
      data: {
        token: 'SH6643HDHJSGFJSD73475674856'
      },
      duration: 1000
    })
  }
  return mockData({
    error: {
      statusText: 'user name or pass word incorrect'
    },
    duration: 1000
  })
}

export { login }
