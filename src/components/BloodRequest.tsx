import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Clock, MapPin, Phone, User, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BloodRequestProps {
  onBack: () => void;
}

export const BloodRequest = ({ onBack }: BloodRequestProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    patientName: "",
    requesterName: "",
    phone: "",
    bloodGroup: "",
    unitsRequired: "",
    urgency: "",
    hospital: "",
    city: "Nashik",
    address: "",
    reasonForRequest: "",
    doctorContact: "",
    preferredDonorType: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencyLevels = [
    { value: "critical", label: "Critical (within 2 hours)", color: "bg-emergency" },
    { value: "urgent", label: "Urgent (within 6 hours)", color: "bg-warning" },
    { value: "routine", label: "Routine (within 24 hours)", color: "bg-success" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Blood Request Submitted!",
      description: "Emergency alerts sent to nearby donors. You'll receive updates soon.",
    });

    // Reset form
    setFormData({
      patientName: "",
      requesterName: "",
      phone: "",
      bloodGroup: "",
      unitsRequired: "",
      urgency: "",
      hospital: "",
      city: "Nashik",
      address: "",
      reasonForRequest: "",
      doctorContact: "",
      preferredDonorType: "",
    });
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getUrgencyColor = (urgency: string) => {
    const level = urgencyLevels.find(u => u.value === urgency);
    return level?.color || "bg-muted";
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
              <div className="w-8 h-8 bg-gradient-to-br from-emergency to-primary rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold">Emergency Blood Request</h1>
                <p className="text-xs text-muted-foreground">Connect with donors instantly</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emergency to-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Request Blood</h1>
          <p className="text-muted-foreground">Submit your emergency blood requirement and we'll notify nearby donors</p>
        </div>

        {/* Emergency Banner */}
        <div className="mb-6 p-4 bg-emergency/10 border border-emergency/20 rounded-xl">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-emergency flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-emergency">Emergency Protocol Active</h3>
              <p className="text-sm text-emergency/80">
                Donors within 10km radius will be notified immediately upon submission
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <span>Blood Request Details</span>
            </CardTitle>
            <CardDescription>
              Please provide accurate information for faster donor matching
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient & Requester Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name *</Label>
                  <Input
                    id="patientName"
                    placeholder="Enter patient's name"
                    value={formData.patientName}
                    onChange={(e) => updateFormData("patientName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requesterName">Requester Name *</Label>
                  <Input
                    id="requesterName"
                    placeholder="Your name"
                    value={formData.requesterName}
                    onChange={(e) => updateFormData("requesterName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Number *</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="doctorContact">Doctor's Contact</Label>
                  <Input
                    id="doctorContact"
                    placeholder="Doctor's phone number"
                    value={formData.doctorContact}
                    onChange={(e) => updateFormData("doctorContact", e.target.value)}
                  />
                </div>
              </div>

              {/* Blood Requirements */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4 flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <span>Blood Requirements</span>
                </h3>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group *</Label>
                    <Select value={formData.bloodGroup} onValueChange={(value) => updateFormData("bloodGroup", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
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
                    <Label htmlFor="unitsRequired">Units Required *</Label>
                    <Input
                      id="unitsRequired"
                      type="number"
                      min="1"
                      max="10"
                      placeholder="1-10 units"
                      value={formData.unitsRequired}
                      onChange={(e) => updateFormData("unitsRequired", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency Level *</Label>
                    <Select value={formData.urgency} onValueChange={(value) => updateFormData("urgency", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${level.color}`} />
                              <span>{level.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {formData.urgency && (
                  <div className="mb-4">
                    <Badge className={`${getUrgencyColor(formData.urgency)} text-white`}>
                      {urgencyLevels.find(u => u.value === formData.urgency)?.label}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Location & Hospital */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4 flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Location Details</span>
                </h3>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="hospital">Hospital/Medical Center *</Label>
                    <Input
                      id="hospital"
                      placeholder="Hospital name"
                      value={formData.hospital}
                      onChange={(e) => updateFormData("hospital", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="Nashik"
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <Label htmlFor="address">Hospital Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Complete hospital address for precise location"
                    rows={2}
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-2">
                <Label htmlFor="reasonForRequest">Reason for Blood Requirement</Label>
                <Textarea
                  id="reasonForRequest"
                  placeholder="Brief description of medical condition or emergency (optional)"
                  rows={3}
                  value={formData.reasonForRequest}
                  onChange={(e) => updateFormData("reasonForRequest", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredDonorType">Preferred Donor Type</Label>
                <Select value={formData.preferredDonorType} onValueChange={(value) => updateFormData("preferredDonorType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any verified donor (recommended)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any verified donor</SelectItem>
                    <SelectItem value="family">Family/Friends only</SelectItem>
                    <SelectItem value="voluntary">Voluntary donors only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-emergency to-primary hover:from-emergency/90 hover:to-primary/90"
                size="lg"
              >
                Submit Emergency Request
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-accent/50 rounded-xl">
          <h4 className="font-semibold mb-2 text-center">What happens next?</h4>
          <ul className="text-sm text-muted-foreground space-y-1 max-w-md mx-auto">
            <li>• Nearby donors will be notified via SMS and email</li>
            <li>• You'll receive donor contacts as they respond</li>
            <li>• Track request status in real-time</li>
            <li>• Emergency services will be alerted for critical cases</li>
          </ul>
        </div>
      </div>
    </div>
  );
};