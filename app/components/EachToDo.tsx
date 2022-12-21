'use client';

import Image from 'next/image';
import React from 'react';
import { TodoItem } from '../../models/tigris/todoItems';

type Props = {
  toDoItem: TodoItem;
  deleteHandler: (id?: number) => void;
  updateHandler: (item: TodoItem) => void;
};
const EachTodo = ({ toDoItem, deleteHandler, updateHandler }: Props) => {
  return (
    <>
      <li className="each">
        <button
          className="eachButton"
          onClick={() => {
            updateHandler(toDoItem);
          }}
        >
          <Image
            src={toDoItem.completed ? '/circle-checked.svg' : '/circle.svg'}
            width={20}
            height={20}
            alt="Check Image"
          />
          <span style={toDoItem.completed ? { textDecoration: 'line-through' } : {}}>{toDoItem.text}</span>
        </button>
        <button
          className="deleteBtn"
          onClick={() => {
            deleteHandler(toDoItem.id);
          }}
        >
          <Image src="/delete.svg" width={24} height={24} alt="Check Image" />
        </button>
      </li>
    </>
  );
};

export default EachTodo;
