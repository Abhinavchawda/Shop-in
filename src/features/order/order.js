import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount } from './orderSlice';

export default function Order() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div className='min-h-screen bg-slate-400'>
      Hii
    </div>
  );
}
