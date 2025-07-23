"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { DollarSign, Users, CreditCard, Activity, TrendingUp, TrendingDown, Eye } from "lucide-react"

const financeData = {
  today: [
    { time: "00:00", amount: 0 },
    { time: "06:00", amount: 150 },
    { time: "12:00", amount: 300 },
    { time: "18:00", amount: 450 },
    { time: "24:00", amount: 520 },
  ],
  yesterday: [
    { time: "00:00", amount: 0 },
    { time: "06:00", amount: 200 },
    { time: "12:00", amount: 400 },
    { time: "18:00", amount: 600 },
    { time: "24:00", amount: 750 },
  ],
  "7days": [
    { day: "Mon", amount: 750 },
    { day: "Tue", amount: 520 },
    { day: "Wed", amount: 890 },
    { day: "Thu", amount: 1200 },
    { day: "Fri", amount: 980 },
    { day: "Sat", amount: 1500 },
    { day: "Sun", amount: 1100 },
  ],
  "30days": [
    { week: "Week 1", amount: 5200 },
    { week: "Week 2", amount: 6800 },
    { week: "Week 3", amount: 7200 },
    { week: "Week 4", amount: 8900 },
  ],
  year: [
    { month: "Jan", amount: 25000 },
    { month: "Feb", amount: 28000 },
    { month: "Mar", amount: 32000 },
    { month: "Apr", amount: 29000 },
    { month: "May", amount: 35000 },
    { month: "Jun", amount: 38000 },
  ],
}

const userData = {
  today: [
    { time: "00:00", registrations: 0, logins: 0 },
    { time: "06:00", registrations: 5, logins: 45 },
    { time: "12:00", registrations: 12, logins: 120 },
    { time: "18:00", registrations: 18, logins: 200 },
    { time: "24:00", registrations: 25, logins: 280 },
  ],
  yesterday: [
    { time: "00:00", registrations: 0, logins: 0 },
    { time: "06:00", registrations: 8, logins: 60 },
    { time: "12:00", registrations: 15, logins: 150 },
    { time: "18:00", registrations: 22, logins: 250 },
    { time: "24:00", registrations: 30, logins: 320 },
  ],
  "7days": [
    { day: "Mon", registrations: 30, logins: 320 },
    { day: "Tue", registrations: 25, logins: 280 },
    { day: "Wed", registrations: 35, logins: 380 },
    { day: "Thu", registrations: 40, logins: 420 },
    { day: "Fri", registrations: 45, logins: 480 },
    { day: "Sat", registrations: 55, logins: 550 },
    { day: "Sun", registrations: 50, logins: 520 },
  ],
}

const transactionHistory = [
  {
    id: "GPA.3308-4013-7151-02994",
    gateway: "Mobile applications",
    plugin: "Paid Membership",
    details: "1.99 USD per 1 month(s) (recurring) (Android)",
    amount: "1.99",
    currency: "USD",
    user: "Carlos Reid",
    time: "Aug 31, 6:36 AM",
  },
  {
    id: "GPA.4421-5124-8262-03105",
    gateway: "PayPal",
    plugin: "Premium Features",
    details: "9.99 USD one-time payment",
    amount: "9.99",
    currency: "USD",
    user: "Sarah Johnson",
    time: "Aug 31, 4:22 PM",
  },
  {
    id: "GPA.5532-6235-9373-04216",
    gateway: "Stripe",
    plugin: "VIP Membership",
    details: "19.99 USD per 1 month(s) (recurring)",
    amount: "19.99",
    currency: "USD",
    user: "Mike Chen",
    time: "Aug 30, 11:15 AM",
  },
]

export default function AdminDashboard() {
  const [financeFilter, setFinanceFilter] = useState("today")
  const [userFilter, setUserFilter] = useState("today")

  const getFinanceStats = () => {
    const data = financeData[financeFilter as keyof typeof financeData]
    const total = data[data.length - 1]?.amount || 0
    const transactions = Math.floor(total / 10) // Simulate transaction count
    return { total, transactions }
  }

  const getUserStats = () => {
    const data = userData[userFilter as keyof typeof userData]
    if (!data) return { registrations: 0, logins: 0 }
    const latest = data[data.length - 1]
    return {
      registrations: latest?.registrations || 0,
      logins: latest?.logins || 0,
    }
  }

  const financeStats = getFinanceStats()
  const userStats = getUserStats()

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <Badge variant="secondary">Live Data</Badge>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,350</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,234</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingDown className="inline h-3 w-3 mr-1" />
                  -2% from last hour
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Finance Statistics */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Finance Statistics</CardTitle>
                  <CardDescription>Revenue and transaction data</CardDescription>
                </div>
                <Select value={financeFilter} onValueChange={setFinanceFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="year">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={financeData[financeFilter as keyof typeof financeData]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey={
                        financeFilter === "today" || financeFilter === "yesterday"
                          ? "time"
                          : financeFilter === "7days"
                            ? "day"
                            : financeFilter === "30days"
                              ? "week"
                              : "month"
                      }
                    />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Transactions</p>
                  <p className="text-2xl font-bold">{financeStats.transactions}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-2xl font-bold">${financeStats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Statistics */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>User Statistics</CardTitle>
                  <CardDescription>Registration and login data</CardDescription>
                </div>
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userData[userFilter as keyof typeof userData]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={userFilter === "today" || userFilter === "yesterday" ? "time" : "day"} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="registrations" fill="#8884d8" name="Registrations" />
                    <Bar dataKey="logins" fill="#82ca9d" name="Logins" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Registrations</p>
                  <p className="text-2xl font-bold">{userStats.registrations}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Logins</p>
                  <p className="text-2xl font-bold">{userStats.logins}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Recent payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Transaction ID</th>
                      <th className="text-left p-2">Gateway</th>
                      <th className="text-left p-2">Plugin</th>
                      <th className="text-left p-2">Details</th>
                      <th className="text-left p-2">Amount</th>
                      <th className="text-left p-2">Currency</th>
                      <th className="text-left p-2">User</th>
                      <th className="text-left p-2">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionHistory.map((transaction) => (
                      <tr key={transaction.id} className="border-b">
                        <td className="p-2 font-mono text-xs">{transaction.id}</td>
                        <td className="p-2">{transaction.gateway}</td>
                        <td className="p-2">{transaction.plugin}</td>
                        <td className="p-2 max-w-xs truncate">{transaction.details}</td>
                        <td className="p-2 font-semibold">{transaction.amount}</td>
                        <td className="p-2">{transaction.currency}</td>
                        <td className="p-2">{transaction.user}</td>
                        <td className="p-2 text-xs text-muted-foreground">{transaction.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
