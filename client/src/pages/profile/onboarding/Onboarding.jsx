import React from 'react'
import { useSearchParams } from 'react-router-dom';

export function Onboarding() {
  const [searchParams, _] = useSearchParams();

  // Get a specific query parameter
  const user = searchParams.get('user');

  return (
    <div className='tw-bg-primary'>{user}</div>
  )
}
