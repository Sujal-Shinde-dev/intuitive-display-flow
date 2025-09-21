import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Phone, Users, Clock, Search } from "lucide-react";
import { DonorRegistration } from "@/components/DonorRegistration";
import { BloodRequest } from "@/components/BloodRequest";
import { DonorSearch } from "@/components/DonorSearch";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"home" | "register" | "request" | "search">("home");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const stats = [
    { icon: Users, label: "Active Donors", value: "12,847" },
    { icon: Heart, label: "Lives Saved", value: "3,290" },
    { icon: MapPin, label: "Cities Covered", value: "156" },
    { icon: Clock, label: "Avg Response Time", value: "18 min" },
  ];

  const emergencyContacts = [
    { name: "Emergency Blood Bank", phone: "108", location: "Nashik Central" },
    { name: "Red Cross Society", phone: "+91-253-2506789", location: "College Road" },
    { name: "District Hospital", phone: "+91-253-2506123", location: "Mumbai Naka" },
  ];

  if (activeTab === "register") {
    return <DonorRegistration onBack={() => setActiveTab("home")} />;
  }

  if (activeTab === "request") {
    return <BloodRequest onBack={() => setActiveTab("home")} />;
  }

  if (activeTab === "search") {
    return <DonorSearch onBack={() => setActiveTab("home")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/50 to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-emergency rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">LifeLink</h1>
                <p className="text-xs text-muted-foreground">Blood Donation Platform</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-emergency/10 text-emergency border-emergency/20">
              Emergency Hotline: 108
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <Badge className="mb-4 bg-emergency/10 text-emergency border-emergency/20">
              🚨 Emergency Blood Finder
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-emergency bg-clip-text text-transparent">
              Save Lives in Minutes
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with verified blood donors instantly. Location-based matching for emergency blood requirements.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/40"
              onClick={() => setActiveTab("request")}
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-emergency rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-emergency">Need Blood</CardTitle>
                <CardDescription>Request blood urgently</CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/40"
              onClick={() => setActiveTab("register")}
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-primary">Donate Blood</CardTitle>
                <CardDescription>Register as a donor</CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/40"
              onClick={() => setActiveTab("search")}
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-success">Find Donors</CardTitle>
                <CardDescription>Search nearby donors</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Making a Difference</h2>
            <p className="text-muted-foreground">Real-time impact of our platform</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blood Groups Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Blood Group Compatibility</h2>
            <p className="text-muted-foreground">Understanding blood type matching for donations</p>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 max-w-2xl mx-auto">
            {bloodGroups.map((group) => (
              <div
                key={group}
                className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/50 transition-colors"
              >
                <div className="text-lg font-bold text-primary">{group}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Emergency Contacts</h2>
            <p className="text-muted-foreground">Quick access to blood banks and hospitals in Nashik</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {emergencyContacts.map((contact, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-emergency/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-emergency" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{contact.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{contact.location}</p>
                      <Button variant="outline" size="sm" className="w-full">
                        Call {contact.phone}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-emergency rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">LifeLink</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Connecting donors and recipients to save lives. Every drop counts.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;