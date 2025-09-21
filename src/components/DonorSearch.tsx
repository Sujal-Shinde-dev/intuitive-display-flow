import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, MapPin, Phone, Heart, Clock, User, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DonorSearchProps {
  onBack: () => void;
}

interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  location: string;
  distance: string;
  lastDonation: string;
  phone: string;
  availability: "available" | "not-available" | "recently-donated";
  verified: boolean;
}

export const DonorSearch = ({ onBack }: DonorSearchProps) => {
  const { toast } = useToast();
  const [searchData, setSearchData] = useState({
    bloodGroup: "",
    location: "Nashik",
    maxDistance: "10",
  });

  const [searchResults, setSearchResults] = useState<Donor[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Mock donor data
  const mockDonors: Donor[] = [
    {
      id: "1",
      name: "Rahul Sharma",
      bloodGroup: "O+",
      location: "Panchavati, Nashik",
      distance: "2.3 km",
      lastDonation: "2024-06-15",
      phone: "+91 98765 43210",
      availability: "available",
      verified: true,
    },
    {
      id: "2",
      name: "Priya Patel",
      bloodGroup: "O+",
      location: "College Road, Nashik",
      distance: "3.1 km",
      lastDonation: "2024-04-20",
      phone: "+91 87654 32109",
      availability: "available",
      verified: true,
    },
    {
      id: "3",
      name: "Amit Kumar",
      bloodGroup: "O+",
      location: "Cidco, Nashik",
      distance: "5.7 km",
      lastDonation: "2024-08-10",
      phone: "+91 76543 21098",
      availability: "recently-donated",
      verified: true,
    },
    {
      id: "4",
      name: "Sneha Desai",
      bloodGroup: "O+",
      location: "Gangapur Road, Nashik",
      distance: "4.2 km",
      lastDonation: "2024-05-30",
      phone: "+91 65432 10987",
      availability: "available",
      verified: true,
    },
  ];

  const handleSearch = () => {
    if (!searchData.bloodGroup) {
      toast({
        title: "Blood Group Required",
        description: "Please select a blood group to search for donors.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const filtered = mockDonors.filter(donor => 
        donor.bloodGroup === searchData.bloodGroup
      );
      setSearchResults(filtered);
      setIsSearching(false);
      
      toast({
        title: "Search Complete",
        description: `Found ${filtered.length} donors in your area.`,
      });
    }, 1500);
  };

  const updateSearchData = (field: string, value: any) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "available":
        return <Badge className="bg-success text-success-foreground">Available</Badge>;
      case "recently-donated":
        return <Badge variant="secondary">Recently Donated</Badge>;
      case "not-available":
        return <Badge variant="destructive">Not Available</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const contactDonor = (donor: Donor) => {
    toast({
      title: "Connecting to Donor",
      description: `Opening contact for ${donor.name}. Please be respectful and explain your requirement clearly.`,
    });
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
              <div className="w-8 h-8 bg-gradient-to-br from-success to-primary rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold">Find Donors</h1>
                <p className="text-xs text-muted-foreground">Search nearby blood donors</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-success to-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Find Blood Donors</h1>
          <p className="text-muted-foreground">Search for verified blood donors in your area</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-primary" />
              <span>Search Criteria</span>
            </CardTitle>
            <CardDescription>
              Find donors based on blood group and location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group *</Label>
                <Select value={searchData.bloodGroup} onValueChange={(value) => updateSearchData("bloodGroup", value)}>
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
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input
                    id="location"
                    placeholder="Nashik"
                    className="pl-10"
                    value={searchData.location}
                    onChange={(e) => updateSearchData("location", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxDistance">Max Distance</Label>
                <Select value={searchData.maxDistance} onValueChange={(value) => updateSearchData("maxDistance", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Within 5 km</SelectItem>
                    <SelectItem value="10">Within 10 km</SelectItem>
                    <SelectItem value="25">Within 25 km</SelectItem>
                    <SelectItem value="50">Within 50 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="w-full bg-gradient-to-r from-success to-primary hover:from-success/90 hover:to-primary/90"
                >
                  {isSearching ? "Searching..." : "Search Donors"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Search Results</h2>
              <Badge variant="secondary">
                {searchResults.length} donors found
              </Badge>
            </div>

            <div className="grid gap-4">
              {searchResults.map((donor) => (
                <Card key={donor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">{donor.name}</h3>
                            {donor.verified && (
                              <Badge className="bg-success text-success-foreground text-xs">
                                ✓ Verified
                              </Badge>
                            )}
                            {getAvailabilityBadge(donor.availability)}
                          </div>
                          
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <Heart className="w-4 h-4 text-primary" />
                              <span>Blood Group: <strong className="text-primary">{donor.bloodGroup}</strong></span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span>{donor.location} • {donor.distance}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>Last donation: {new Date(donor.lastDonation).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button
                          size="sm"
                          onClick={() => contactDonor(donor)}
                          disabled={donor.availability !== "available"}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                        {donor.availability === "available" && (
                          <Badge className="bg-success/10 text-success text-center text-xs">
                            Available Now
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {searchResults.length === 0 && !isSearching && searchData.bloodGroup && (
          <Card>
            <CardContent className="pt-8 pb-8 text-center">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Donors Found</h3>
              <p className="text-muted-foreground mb-4">
                No donors found for {searchData.bloodGroup} in your area. Try expanding your search radius.
              </p>
              <Button variant="outline" onClick={() => updateSearchData("maxDistance", "50")}>
                Expand Search Area
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <div className="mt-8 p-4 bg-accent/50 rounded-xl">
          <h4 className="font-semibold mb-2 text-center">Search Tips</h4>
          <ul className="text-sm text-muted-foreground space-y-1 max-w-md mx-auto">
            <li>• Compatible blood groups will also be shown (e.g., O- for all groups)</li>
            <li>• Verified donors have completed identity verification</li>
            <li>• Contact donors respectfully and explain your requirement clearly</li>
            <li>• Consider expanding search radius if no donors found nearby</li>
          </ul>
        </div>
      </div>
    </div>
  );
};