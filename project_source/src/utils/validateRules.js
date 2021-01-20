import { checkEmail, checkMobile } from './valitator'
export const loginFormRules = {
  username: [
    {
      required: true,
      message: '请输入账号!',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码!',
      trigger: 'blur'
    }
  ]
}

export const addFormRules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 10,
      message: '用户名长度在3~10个字符之间',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 10,
      message: '密码长度在6~16个字符之间',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur'
    },
    {
      validator: checkEmail,
      trigger: 'blur'
    }
  ],
  mobile: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: 'blur'
    },
    {
      validator: checkMobile,
      trigger: 'blur'
    }
  ]
}

export const editFormRules = {
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur'
    },
    {
      validator: checkEmail,
      trigger: 'blur'
    }
  ],
  mobile: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: 'blur'
    },
    {
      validator: checkMobile,
      trigger: 'blur'
    }
  ]
}

export const addParamsRules = {
  attr_name: [{ required: true, message: "请输入值", trigger: "blur" }]
}
export const editParamsRules = {
  attr_name: [{ required: true, message: "请输入值", trigger: "blur" }]
}

export const addrRules = {
  addr2: [{ required: true, message: "请完善详细地址", trigger: "blur" }]
}