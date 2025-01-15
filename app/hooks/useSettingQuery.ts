'use client'

import { useState } from 'react'
// import secureLocalStorage from "react-secure-storage";
import { useMutation, useQuery } from '@tanstack/react-query'
import { Toast } from '../components/Toast'
import { useAppSelector } from '../redux/hook'
import { postApi } from '../services'
import { User } from '../typings'

export const useSettingQuery = () => {
  const [loading, setLoading] = useState(false)
  const user: User = useAppSelector((state) => state?.user?.user)
  const [addUserModal, setAddUserModal] = useState(false)
  const handleModal = () => setAddUserModal((prev) => !prev)
  const [addUserModal1, setAddUserModal1] = useState(false)
  const handleModal1 = () => setAddUserModal1((prev) => !prev)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [password2, setPassword2] = useState('')
  const [password3, setPassword3] = useState('')
  const payload: any = {
    email: user?.emailAddress,
    oldPassword: password?.trim(),
    newPassword: password2?.trim(),
    confirmPassword: password3?.trim()
  }
  const { mutate } = useMutation({
    mutationFn: () => postApi(`Admin/UpdatePassword`, payload),
    onSuccess: (data) => {
      console.log('data', data)
      setLoading(false)
      Toast({ title: data.responseMessage, error: false })
      //   Toast({
      //     title: "Password Updated Successfully",
      //     error: false,
      //   });
      setAddUserModal(false)
    },
    onError: (error) => {
      console.log('there was an error', error)
    }
  })
  const handleSubmit = (e: React.FormEvent<Element> | undefined) => {
    e?.preventDefault()
    mutate()
  }
    // const getExpiration  = async () => {
    //   try {
    //     const resp = await postApi("v1/auth/refresh",'');
    //     return resp.data
    //   } catch (error) {
    //     console.error("Er", error);
    //   }
    // };
    // const authCheck = useQuery({
    //   queryKey: ["authCheck"],
    //   queryFn: getExpiration,
    //   refetchOnReconnect: true,
    //   retry: 5,
    //   retryDelay: 100,
    //   staleTime: 5000,
    //   refetchOnMount: true,
    //   refetchInterval: 120000, // 2 minutes
    //   refetchIntervalInBackground: true,
    //   onSuccess(data: any) {
    //     //   Toast({ title: "page refreshed", error: false });
    //   },
    //   onError: (error: any) => console.error(error),
    // });
  return {
    loading,
    setLoading,
    mutate,
    username,
    password,
    password2,
    password3,
    setPassword,
    setPassword2,
    setPassword3,
    setUsername,
    open,
    handleModal,
    handleModal1,
    addUserModal1,
    addUserModal,
    user,
    setAddUserModal,
    handleSubmit
  };
}
