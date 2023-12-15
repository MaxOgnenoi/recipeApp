import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Animated from "react-native-reanimated";

export const=CashedImage=(props) => {
    const [cashedSource, setCashedSource]=useState(null)
    const {uri}=props

    useEffect(()=> {
        const getCashedImage=async () => {
            try {
                const cashedImageData=await AsyncStorage.getItem(uri)
                if (cashedImageData) {
                    setCashedSource({uri: cashedImageData})
                } else {
const response=await fetch(uri)
const imageBlob =await response.blob()
const base64Data=await new Promise((resolve)=>{
    const reader =new FileReader()
    reader.readAsDataURL(imageBlob)
    reader.onloadend=()=>{
        resolve(reader.result)
    }
})
await AsyncStorage.setItem(uri, base64Data)
setCashedSource({uri: base64Data})
                }
            } catch (error) {
                console.error('Error caching image', error)
            }
        }
    })
}