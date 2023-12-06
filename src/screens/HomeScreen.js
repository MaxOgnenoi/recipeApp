import {View, Text, ScrollView} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function HomeScreen() {
    return (
        <View className="flex-1 bg-white">
            <StatusBar style='dark'/>
            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:50}}
            className="space-y-6 pt-14">
                {/* avatar and bell icon */}
                <View className="mx-4 flex-row justify-between items-center mb-2">
                    <Image source={require('../../assets/images/avatar.png')} style={{height:(5)}, width GitPullRequestIcon(5.5)}
                </View>
            </ScrollView>
        </View>
    )
}