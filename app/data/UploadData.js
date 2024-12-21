import React, { useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './../../firebase'; // Path ke file firebase.js

const popular = [
  {
    id: 1,
    title: 'Biceps Training',
    duration: '30',
    calories: '90-150',
    photo_url: 'https://www.bodybuilding.com/images/2017/september/the-14-best-biceps-exercieses-for-men-header-960x540.jpg',
  },
  {
    id: 2,
    title: 'Triceps Training',
    duration: '30',
    calories: '100',
    photo_url: 'https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2019/12/arms-triceps-gym-cable-machine.jpg?w=1300&h=731&crop=1&quality=86&strip=all',
  },
];

const UploadData = () => {
  useEffect(() => {
    const uploadData = async () => {
      try {
        const collectionRef = collection(db, 'workouts'); // Ganti 'workouts' dengan nama koleksi Anda
        for (const item of popular) {
          await addDoc(collectionRef, item);
        }
        console.log('Data berhasil diunggah');
      } catch (error) {
        console.error('Error mengunggah data: ', error);
      }
    };

    uploadData();
  }, []);

  return null;
};

export default UploadData;
