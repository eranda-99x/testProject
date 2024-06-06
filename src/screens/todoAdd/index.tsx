import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import { TextInput, SegmentedButtons, Text, Button } from 'react-native-paper';
import { StatusTodo } from '../../redux/interfaces/iTodo';
import uuid from 'react-native-uuid';
import { addTodo, deleteTodo, updateTodo } from '../../redux/slices/todoSlice';
import { useDispatch } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';

const TodoAdd = ({ navigation, route }: StackScreenProps<any>) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState<string>('');
    const [status, setStatus] = useState<string>(StatusTodo.NotDone.toString());
    const [errorText, setErrorText] = useState<string>('');
    const isEditMode = !!route?.params?.item;

    useEffect(() => {
        if (isEditMode) {
            const { title, status } = route.params.item;
            setTitle(title);
            setStatus(status);
            navigation.setOptions({ title: 'Edit Task' });
        }
    }, [isEditMode, navigation, route]);

    const onSubmitTodo = () => {
        if (title.trim().length > 0 && status.trim().length > 0) {
            setErrorText('');
            const todo = {
                id: isEditMode ? route.params.item.id : uuid.v4(),
                title: title.trim(),
                status: status.trim(),
            };
            if (isEditMode) {
                dispatch(updateTodo(todo));
            } else {
                dispatch(addTodo(todo));
            }
            navigation.goBack();
        } else {
            setErrorText('Please check Title and Status');
        }
    };

    const onRemoveTodo = () => {
        if (isEditMode) {
            dispatch(deleteTodo(route.params.item.id));
        }
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView>
                <View style={styles.contentView}>
                    <Text variant="labelMedium" style={styles.label}>Title</Text>
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text variant="labelMedium" style={styles.label}>Status</Text>
                    <SegmentedButtons
                        value={status}
                        onValueChange={setStatus}
                        buttons={[
                            { value: StatusTodo.NotDone.toString(), label: 'Not Done' },
                            { value: StatusTodo.Done.toString(), label: 'Done' },
                        ]}
                    />

                    {errorText && <Text variant="labelMedium" style={styles.errorText}>{errorText}</Text>}

                    <View style={styles.buttonView}>
                        <Button mode="contained" onPress={onSubmitTodo} style={styles.button}>
                            {isEditMode ? 'Update' : 'Add'}
                        </Button>
                        {isEditMode &&
                            <Button mode="contained" onPress={onRemoveTodo} style={styles.button}>
                                {'Remove'}
                            </Button>
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TodoAdd;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    contentView: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    label: {
        marginVertical: 10,
    },
    errorText: {
        marginVertical: 10,
        color: 'red',
    },
    button: {
        marginVertical: 20,
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }

});
