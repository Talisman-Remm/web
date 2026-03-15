import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createClient } from '@supabase/supabase-js';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const supabaseUrl = 'https://fbeylcwlcrmboyrzgzms.supabase.co';
const supabaseKey = 'sb_publishable_zKBufGcoftrE0-O0XaXDBA_10utKEym';
const supabase = createClient(supabaseUrl, supabaseKey);

const SERVICES = ['AI Agent', 'AI Phone Agent', 'Social Media Automation'] as const;

const contactSchema = z.object({
  fullName: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo debe contener letras'),
  email: z
    .string()
    .email('Correo electrónico inválido')
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|mx|org|net|edu|info)$/,
      'Use un dominio válido (ej: .com, .mx, .org)'
    ),
  service: z.enum(SERVICES),
  companyName: z.string().min(1, 'El nombre de la empresa es obligatorio'),
  problemDescription: z.string().min(50, 'Describa su problema (mínimo 50 caracteres)'),
  additionalInfo: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: { service: 'AI Agent' }
  });

  const charCount = watch('problemDescription')?.length || 0;

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('Luxury Bolt')
        .insert([
          {
            full_name: data.fullName,
            email: data.email.toLowerCase(),
            service: data.service,
            company_name: data.companyName,
            problem_description: data.problemDescription,
            additional_info: data.additionalInfo || '',
          },
        ]);

      if (error) throw error;

      toast.success('Application submitted successfully!');
      reset();
    } catch (error: any) {
      console.error('Error:', error);
      toast.error('Error al enviar los datos a Supabase');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-[#050505]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="max-w-3xl mx-auto bg-[#0F0F0F] border border-[#D4AF37]/20 p-8 md:p-12 shadow-[0_0_50px_rgba(212,175,55,0.1)]"
      >
        <motion.h2
          variants={itemVariants}
          className="font-['Playfair_Display'] text-4xl font-bold mb-4 text-[#D4AF37] text-center"
        >
          Automation Contact
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="font-['Inter'] text-gray-400 mb-10 text-center font-light"
        >
          Complete the form to receive a personalized proposal.
        </motion.p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-400 mb-2 font-['Inter']">Full Name</label>
              <motion.input
                whileFocus={{ scale: 1.02, borderColor: '#D4AF37' }}
                transition={{ duration: 0.2 }}
                {...register('fullName')}
                placeholder="Ej. Juan Pérez"
                className="w-full bg-[#050505] border border-[#D4AF37]/20 px-4 py-3 text-white outline-none transition-all placeholder:text-gray-700"
              />
              {errors.fullName && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-xs mt-1 block"
                >
                  {errors.fullName.message}
                </motion.span>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-400 mb-2 font-['Inter']">Email</label>
              <motion.input
                whileFocus={{ scale: 1.02, borderColor: '#D4AF37' }}
                transition={{ duration: 0.2 }}
                {...register('email')}
                placeholder="usuario@dominio.com"
                className={`w-full bg-[#050505] border px-4 py-3 text-white outline-none transition-all 
                  ${errors.email ? 'border-red-500' : 'border-[#D4AF37]/20'}`}
              />
              {errors.email && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-xs mt-1 block"
                >
                  {errors.email.message}
                </motion.span>
              )}
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-400 mb-2 font-['Inter']">Type Service</label>
              <motion.select
                whileFocus={{ scale: 1.02, borderColor: '#D4AF37' }}
                {...register('service')}
                className="w-full bg-[#050505] border border-[#D4AF37]/20 px-4 py-3 text-white outline-none cursor-pointer"
              >
                {SERVICES.map(s => (
                  <option key={s} value={s} className="bg-[#0F0F0F]">
                    {s}
                  </option>
                ))}
              </motion.select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-400 mb-2 font-['Inter']">Company</label>
              <motion.input
                whileFocus={{ scale: 1.02, borderColor: '#D4AF37' }}
                {...register('companyName')}
                placeholder="Company Name"
                className="w-full bg-[#050505] border border-[#D4AF37]/20 px-4 py-3 text-white outline-none transition-all placeholder:text-gray-700"
              />
              {errors.companyName && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-xs mt-1 block"
                >
                  {errors.companyName.message}
                </motion.span>
              )}
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-400 mb-2 font-['Inter']">
              What problems does it seek to solve?
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.02, borderColor: '#D4AF37' }}
              {...register('problemDescription')}
              rows={4}
              placeholder="Briefly describe your technological need..."
              className="w-full bg-[#050505] border border-[#D4AF37]/20 px-4 py-3 text-white outline-none transition-all resize-none placeholder:text-gray-700"
            />
            <div className="flex justify-between mt-1">
              {errors.problemDescription && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-xs"
                >
                  {errors.problemDescription.message}
                </motion.span>
              )}
              <span className={`text-xs ${charCount < 50 ? 'text-gray-600' : 'text-[#D4AF37]'}`}>
                {charCount}/50 characters min.
              </span>
            </div>
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#D4AF37] text-[#050505] font-['Inter'] font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            {isSubmitting ? 'Processing...' : 'Submit Application'}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}