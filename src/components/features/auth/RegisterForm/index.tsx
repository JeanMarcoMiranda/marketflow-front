import { Building2, User } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

// Types
interface PersonalData {
  email: String;
  password: String;
  confirmPassword: String;
}

interface BusinessData {
  businessName: String;
  branchName: String;
}

type FormData = PersonalData & BusinessData;

export const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      businessName: '',
      branchName: ''
    }
  })

  const { register, watch, handleSubmit, reset, formState: { errors } } = methods;

  const steps = [
    {
      id: 1,
      title: 'Datos Personales',
      description: 'Información básica del usuario',
      icon: User,
      requiredFields: ['firstName', 'lastName', 'email', 'phone']
    },
    {
      id: 2,
      title: 'Datos del Negocio',
      description: 'Información de tu empresa',
      icon: Building2,
      requiredFields: ['businessName', 'branchName']
    }
  ]

  const watchedValues = watch();

  const validateStep = (step: number): boolean => {
    const currentStepData = steps[step - 1];
    return currentStepData.requiredFields.every(field =>
      watchedValues[field as keyof FormData]?.trim() !== ''
    );
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4">
      <div className='max-w-4 mx-auto'>
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Crear Nueva Cuenta
          </h1>
          <p className="text-gray-600 text-lg">
            Completa todos los pasos para registrar tu cuenta empresarial
          </p>
        </div>
      </div>
    </div>
  )
}
