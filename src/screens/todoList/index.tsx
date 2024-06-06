import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/configStore';
import { StackScreenProps } from '@react-navigation/stack';
import { List, FAB, TextInput, Divider } from 'react-native-paper';
import { StatusTodo, Todo } from '../../redux/interfaces/iTodo';


const TodoList = ({ navigation }: StackScreenProps<any>) => {
    const [searchQuery, setSearchQuery] = useState('');
    const todos = useSelector((state: RootState) => state.todos);

    const filteredTodos = todos.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const Item = ({ item }: { item: Todo }) => (
        <TouchableOpacity key={item.id} onPress={() => navigation.navigate('TodoAdd', { item })}>
            <List.Item
                title={'Task Name: ' + item.title}
                description={'Status : ' + (item.status.toString() === '0' ? 'Not Done' : 'Done')}
                key={item.id}
            />
            <Divider />
        </TouchableOpacity>
    );

    const EmptyListMessage = () => (
        <List.Item
            title={'Task Name: Create todo list'}
            key={'empty_0'}
            description={'Status : Done'}
        />
    );

    return (
        <SafeAreaView style={styles.mainContainer}>
            <TextInput
                label="Search Task"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />
            <FlatList
                data={searchQuery.length > 0 ? filteredTodos : todos}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.id}
                ListEmptyComponent={EmptyListMessage}
            />

            <FAB
                label='Add Task'
                style={styles.fab}
                onPress={() => navigation.navigate('TodoAdd')}
            />
        </SafeAreaView>
    );
};

export default TodoList;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});