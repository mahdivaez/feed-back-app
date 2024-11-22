"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [rating, setRating] = useState(0)
  const [formData, setFormData] = useState({ name: "", email: "", feedback: "" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitted:", { ...formData, rating })
    setStep(3) // Move to thank you step
  }

  const resetForm = () => {
    setStep(0)
    setRating(0)
    setFormData({ name: "", email: "", feedback: "" })
    setIsOpen(false)
  }

  const ratingLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"]

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-4 right-4 z-50 rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          <FeedbackIcon className="w-4 h-4 mr-2" />
          Feedback
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[90vw] max-w-md p-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden rounded-md border bg-background shadow-md"
        >
          <div className="p-6">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-semibold text-center">How would you rate your experience?</h2>
                  <div className="flex flex-col space-y-2">
                    {ratingLabels.map((label, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className={cn(
                          "justify-start",
                          rating === index + 1 && "bg-primary text-primary-foreground"
                        )}
                        onClick={() => {
                          setRating(index + 1)
                          setStep(1)
                        }}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.form
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={(e) => {
                    e.preventDefault()
                    setStep(2)
                  }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-semibold text-center">Your Information</h2>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Next</Button>
                </motion.form>
              )}

              {step === 2 && (
                <motion.form
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-semibold text-center">Your Feedback</h2>
                  <div className="space-y-2">
                    <Label htmlFor="feedback">How can we improve our service?</Label>
                    <Textarea
                      id="feedback"
                      name="feedback"
                      value={formData.feedback}
                      onChange={handleInputChange}
                      className="min-h-[100px]"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Submit Feedback</Button>
                </motion.form>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center space-y-4"
                >
                  <CheckCircleIcon className="w-12 h-12 mx-auto text-green-500" />
                  <h2 className="text-xl font-semibold">Thank You for Your Feedback</h2>
                  <p className="text-muted-foreground">We appreciate your input and will use it to improve our services.</p>
                  <Button onClick={resetForm} className="mt-4">Close</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </PopoverContent>
    </Popover>
  )
}

function FeedbackIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

export default FeedbackWidget

