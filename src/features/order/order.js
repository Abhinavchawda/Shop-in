import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  incrementAsync,
  selectCount,
} from './orderSlice';

export default function Order() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div className='h-screen bg-slate-400'>
      <div className='p-5'>hii</div>
    </div>
  );
}
