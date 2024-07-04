import React from 'react';
import { CgSpinnerAlt } from 'react-icons/cg';

export default function Loading() {
  return (
    <div className="loading">
      {/* Add your loading indicator here (e.g., spinner, text) */}
      <CgSpinnerAlt className="animate-spin w-8 h-8" />
    </div>
  );
}
