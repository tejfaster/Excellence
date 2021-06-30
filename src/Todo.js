import React, { useReducer, useCallback } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native'

const Input_Task = 'Input_Task'
const onSubmit = 'Add_Task'
const deletetask = "Delete_Task"

const reducer = (state, action) => {
    switch (action.type) {
        case Input_Task:
            return {
                ...state,
                value: action.value
            }
        case onSubmit:
            const text = action.list
            const id = state.count + 1
            return {
                ...state,
                count: id,
                task: [...state.task, { text, id }]
            }
        case deletetask:
            return {
                ...state,
                task:action.task
            }

    }
}

const Todo = () => {

    const [initalState, dispatch] = useReducer(reducer, {
        value: '',
        task: [],
        count: 0,
    })

    // const data = initalState.task
    // console.log(data)

    const SubmitHandler = () => {
        const data = initalState.value
        if (data.trim().length === 0) {
            Alert.alert('Worng Input',
                'Please check the error in the textform',
                [{
                    text: 'Okay'
                }]
            )
        } else {
            dispatch({ type: onSubmit, list: data })
        }
    }

    const removetask = (id) => {
        // console.log(id)
        const task = initalState.task.filter(task => task.id !== id)
        // console.log(task)
        dispatch({type:deletetask,task:task})
    }


    return (
        <View style={styles.container}>
            <Text style={styles.header}>TODAY TASK</Text>
            <View style={styles.subcontainer}>
                <View >
                    <TextInput
                        placeholder="Enter Your Task"
                        value={initalState.value}
                        onChangeText={(text) => dispatch({ type: Input_Task, value: text })}
                        maxLength={20}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={SubmitHandler}>
                    <Text >Ok</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={initalState.task}
                keyExtractor={item => item.id}
                renderItem={item => (
                    <View style={styles.task}>
                        <Text style={styles.sr}>{item.item.id}</Text>
                        <View style={{ borderwidth: 1, height: '80%', width: '82.5%' }}>
                            <Text style={styles.text}>{item.item.text}</Text>
                        </View>
                        <TouchableOpacity style={styles.delete} onPress={() => removetask(item.item.id)}>
                            <Text>delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'Arial',
        alignSelf: 'center',
    },
    subcontainer: {

        marginVertical: 10,
        borderWidth: 1,
        height: '8%',
        justifyContent: 'space-between',
        borderRadius: 10,
        flexDirection: 'row'
    },
    button: {
        backgroundColor: 'lightblue',
        height: '90%',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2.5,
        borderRadius: 10
    },
    task: {
        flex: 1.5,
        // marginVertical: 10,
        borderWidth: 1,
        height: '40%',
        // justifyContent: 'space-between',
        borderRadius: 10,
        flexDirection: 'row',
        height: '100%',
        padding: 10,
        alignItems: 'center'
    },
    sr: {
        fontSize: 16,
        fontWeight: '700',

    },
    text: {
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 20

    },
    delete: {
        backgroundColor: 'lightblue',
        height: '150%',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2.5,
        borderRadius: 10,
        // marginLeft: '62%',
        marginRight: '10%'
    },
})

export default Todo
