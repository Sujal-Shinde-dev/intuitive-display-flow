import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Heart, MapPin, User, Phone, Mail, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DonorRegistrationProps {
  onBack: () => void;
}

export const DonorRegistration = ({ onBack }: DonorRegistrationProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    bloodGroup: "",
    city: "Nashik",
    address: "",
    emergencyContact: "",
    lastDonation: "",
    medicalConditions: "",
    terms: false,
    emergencyAlerts: true,
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.terms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Registration Successful!",
      description: "Thank you for registering as a blood donor. You'll receive verification details soon.",
    });

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      age: "",
      bloodGroup: "",
      city: "Nashik",
      address: "",
      emergencyContact: "",
      lastDonation: "",
      medicalConditions: "",
      terms: false,
      emergencyAlerts: true,
    });
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/50 to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-emergency rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold">Donor Registration</h1>
                <p className="text-xs text-muted-foreground">Join our life-saving community</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-emergency rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Become a Life Saver</h1>
          <p className="text-muted-foreground">Register as a blood donor and help save lives in your community</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <span>Personal Information</span>
            </CardTitle>
            <CardDescription>
              Please provide accurate information for donor verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => updateFormData("fullName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    min="18"
                    max="65"
                    placeholder="Age (18-65)"
                    value={formData.age}
                    onChange={(e) => updateFormData("age", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="pl-10"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Blood Group & Location */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group *</Label>
                  <Select value={formData.bloodGroup} onValueChange={(value) => updateFormData("bloodGroup", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <Input
                      id="city"
                      placeholder="Nashik"
                      className="pl-10"
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Complete Address *</Label>
                <Textarea
                  id="address"
                  placeholder="Enter your complete address for location-based matching"
                  rows={3}
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  placeholder="Emergency contact number (optional)"
                  value={formData.emergencyContact}
                  onChange={(e) => updateFormData("emergencyContact", e.target.value)}
                />
              </div>

              {/* Medical Information */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4 flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <span>Medical Information</span>
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="lastDonation">Last Donation Date (if any)</Label>
                    <Input
                      id="lastDonation"
                      type="date"
                      value={formData.lastDonation}
                      onChange={(e) => updateFormData("lastDonation", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalConditions">Medical Conditions</Label>
                    <Textarea
                      id="medicalConditions"
                      placeholder="Please mention any medical conditions or medications (optional)"
                      rows={3}
                      value={formData.medicalConditions}
                      onChange={(e) => updateFormData("medicalConditions", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="border-t pt-6 space-y-4">
                <h3 className="font-semibold">Preferences</h3>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="emergencyAlerts"
                    checked={formData.emergencyAlerts}
                    onCheckedChange={(checked) => updateFormData("emergencyAlerts", checked)}
                  />
                  <Label htmlFor="emergencyAlerts" className="text-sm">
                    Receive emergency blood request alerts via SMS/Email
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.terms}
                    onCheckedChange={(checked) => updateFormData("terms", checked)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the terms and conditions and privacy policy *
                  </Label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-emergency hover:from-primary/90 hover:to-emergency/90"
                size="lg"
              >
                Register as Donor
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-accent/50 rounded-xl">
          <h4 className="font-semibold mb-2 text-center">Donation Guidelines</h4>
          <ul className="text-sm text-muted-foreground space-y-1 max-w-md mx-auto">
            <li>• Must be 18-65 years old and weigh at least 50kg</li>
            <li>• Wait 56 days between whole blood donations</li>
            <li>• Be in good health and well-rested</li>
            <li>• Avoid alcohol 24 hours before donation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};