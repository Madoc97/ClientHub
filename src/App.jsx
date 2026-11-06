import { useEffect, useMemo, useState } from 'react'
import './App.css'

const navItems = [
  'Dashboard',
  'Customers',
  'Leads',
  'Activities',
  'API Management',
  'Usage Tracking',
  'Settings',
]

const statData = [
  { label: 'Total Customers', value: '4,285', change: '+12.4%', trend: 'up' },
  { label: 'Total Leads', value: '1,864', change: '+7.9%', trend: 'up' },
  { label: 'Active API Keys', value: '328', change: '+18.2%', trend: 'up' },
  { label: 'API Requests', value: '8.4M', change: '+24.6%', trend: 'up' },
]

const recentActivities = [
  { title: 'Northwind Labs upgraded plan', time: '14 min ago', type: 'Billing' },
  { title: 'New lead from SaaS outreach sequence', time: '32 min ago', type: 'Lead' },
  { title: 'API key rotated for Atlas Commerce', time: '1 hr ago', type: 'Security' },
  { title: 'Customer health check completed', time: '2 hrs ago', type: 'Review' },
]

const customerOverview = [
  { name: 'Atlas Commerce', value: 82, health: 'Healthy' },
  { name: 'Northwind Labs', value: 68, health: 'Stable' },
  { name: 'Bluepeak Studio', value: 54, health: 'Watchlist' },
  { name: 'Cinder & Co.', value: 91, health: 'Healthy' },
]

const sectionMeta = {
  Dashboard: {
    heading: 'ClientHub overview',
    subtitle: 'Revenue, retention, and product health across your workspace.',
  },
  Customers: {
    heading: 'Customer intelligence',
    subtitle: 'Track accounts, health scores, renewals, and usage patterns.',
  },
  Leads: {
    heading: 'Lead pipeline',
    subtitle: 'Monitor new opportunities and prioritize the highest-value accounts.',
  },
  Activities: {
    heading: 'Activity timeline',
    subtitle: 'Stay aligned with customer actions, team updates, and platform events.',
  },
  'API Management': {
    heading: 'API access control',
    subtitle: 'Manage keys, scopes, and authentication health for every workspace.',
  },
  'Usage Tracking': {
    heading: 'Usage Tracking',
    subtitle: 'Review request volume, reliability, and endpoint health across your ClientHub workflows.',
  },
  Usage: {
    heading: 'Usage Tracking',
    subtitle: 'Review request volume, reliability, and endpoint health across your ClientHub workflows.',
  },
  Settings: {
    heading: 'Workspace settings',
    subtitle: 'Manage organization preferences, permissions, and integrations.',
  },
}

const statusOptions = ['All', 'Active', 'Inactive', 'Pending', 'Prospect']
const leadStatuses = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost']
const leadSourceOptions = ['All', 'Website', 'Referral', 'Outbound', 'Partner', 'Conference', 'Inbound', 'Other']

const defaultFormState = {
  customerId: '',
  companyName: '',
  contactPerson: '',
  email: '',
  phone: '',
  status: 'Active',
  registrationDate: '',
}

const defaultLeadFormState = {
  leadId: '',
  companyName: '',
  contactPerson: '',
  email: '',
  phone: '',
  leadSource: 'Website',
  estimatedDealValue: '',
  leadStatus: 'New',
  assignedTo: '',
  createdDate: new Date().toISOString().slice(0, 10),
  nextFollowUp: new Date().toISOString().slice(0, 10),
}

const activityTypes = ['Calls', 'Meetings', 'Emails', 'Notes', 'Tasks', 'Follow-ups']
const activityPriorityOptions = ['Low', 'Medium', 'High', 'Critical']
const activityStatusOptions = ['All', 'Pending', 'Completed', 'Overdue']

const defaultActivityFormState = {
  activityId: '',
  type: 'Calls',
  subject: '',
  description: '',
  relatedCustomerId: '',
  relatedLeadId: '',
  assignedTo: '',
  activityDate: new Date().toISOString().slice(0, 10),
  dueDate: new Date().toISOString().slice(0, 10),
  priority: 'Medium',
  status: 'Pending',
}

const initialCustomers = [
  {
    id: 1,
    customerId: 'CUST-1001',
    companyName: 'Atlas Commerce',
    contactPerson: 'Maya Harlow',
    email: 'maya@atlascommerce.com',
    phone: '+1 (415) 778-1134',
    status: 'Active',
    registrationDate: '2024-01-18',
  },
  {
    id: 2,
    customerId: 'CUST-1002',
    companyName: 'Northwind Labs',
    contactPerson: 'Samuel Price',
    email: 'sam@nwindlabs.com',
    phone: '+1 (206) 987-2241',
    status: 'Pending',
    registrationDate: '2024-03-21',
  },
  {
    id: 3,
    customerId: 'CUST-1003',
    companyName: 'Bluepeak Studio',
    contactPerson: 'Olivia Grant',
    email: 'olivia@bluepeakstudio.io',
    phone: '+1 (646) 332-7782',
    status: 'Prospect',
    registrationDate: '2024-02-14',
  },
  {
    id: 4,
    customerId: 'CUST-1004',
    companyName: 'Cinder & Co.',
    contactPerson: 'Daniel Mercer',
    email: 'daniel@cinderco.com',
    phone: '+1 (310) 501-9901',
    status: 'Active',
    registrationDate: '2023-11-07',
  },
  {
    id: 5,
    customerId: 'CUST-1005',
    companyName: 'Harbor & Pine',
    contactPerson: 'Chloe Nguyen',
    email: 'chloe@harborpine.co',
    phone: '+1 (512) 701-4450',
    status: 'Inactive',
    registrationDate: '2023-08-09',
  },
  {
    id: 6,
    customerId: 'CUST-1006',
    companyName: 'Summit Digital',
    contactPerson: 'Ethan Ross',
    email: 'ethan@summitdigital.ai',
    phone: '+1 (702) 358-6687',
    status: 'Active',
    registrationDate: '2024-04-29',
  },
]

const initialLeads = [
  {
    id: 1,
    leadId: 'LEAD-2001',
    companyName: 'BrightPath AI',
    contactPerson: 'Ava Thompson',
    email: 'ava@brightpath.ai',
    phone: '+1 (415) 555-0191',
    leadSource: 'Website',
    estimatedDealValue: 180000,
    leadStatus: 'Qualified',
    assignedTo: 'Maya Patel',
    createdDate: '2024-05-08',
    nextFollowUp: '2024-06-12',
    convertedCustomerId: null,
  },
  {
    id: 2,
    leadId: 'LEAD-2002',
    companyName: 'Harbor & Pine',
    contactPerson: 'Chloe Nguyen',
    email: 'chloe@harborpine.co',
    phone: '+1 (512) 701-4450',
    leadSource: 'Referral',
    estimatedDealValue: 95000,
    leadStatus: 'Negotiation',
    assignedTo: 'Jason Lee',
    createdDate: '2024-05-22',
    nextFollowUp: '2024-06-05',
    convertedCustomerId: null,
  },
  {
    id: 3,
    leadId: 'LEAD-2003',
    companyName: 'Summit Digital',
    contactPerson: 'Ethan Ross',
    email: 'ethan@summitdigital.ai',
    phone: '+1 (702) 358-6687',
    leadSource: 'Outbound',
    estimatedDealValue: 220000,
    leadStatus: 'Proposal',
    assignedTo: 'Anita Gomez',
    createdDate: '2024-04-28',
    nextFollowUp: '2024-06-07',
    convertedCustomerId: null,
  },
  {
    id: 4,
    leadId: 'LEAD-2004',
    companyName: 'Northwind Labs',
    contactPerson: 'Samuel Price',
    email: 'sam@nwindlabs.com',
    phone: '+1 (206) 987-2241',
    leadSource: 'Partner',
    estimatedDealValue: 320000,
    leadStatus: 'Won',
    assignedTo: 'Maya Patel',
    createdDate: '2024-03-14',
    nextFollowUp: '2024-06-01',
    convertedCustomerId: null,
  },
  {
    id: 5,
    leadId: 'LEAD-2005',
    companyName: 'Red Cedar Works',
    contactPerson: 'Noah Brooks',
    email: 'noah@redcedarworks.com',
    phone: '+1 (503) 331-7724',
    leadSource: 'Conference',
    estimatedDealValue: 76000,
    leadStatus: 'Contacted',
    assignedTo: 'Priya Shah',
    createdDate: '2024-05-15',
    nextFollowUp: '2024-06-04',
    convertedCustomerId: null,
  },
  {
    id: 6,
    leadId: 'LEAD-2006',
    companyName: 'Helio Labs',
    contactPerson: 'Lena Park',
    email: 'lena@heliolabs.co',
    phone: '+1 (347) 551-8840',
    leadSource: 'Inbound',
    estimatedDealValue: 140000,
    leadStatus: 'Lost',
    assignedTo: 'Jason Lee',
    createdDate: '2024-04-06',
    nextFollowUp: '2024-05-21',
    convertedCustomerId: null,
  },
]

const initialActivities = [
  {
    id: 1,
    activityId: 'ACT-1001',
    type: 'Email',
    subject: 'Discovery email sent',
    description: 'Sent the discovery email to Atlas Commerce stakeholders and requested a discovery call.',
    relatedCustomerId: 1,
    relatedLeadId: '',
    assignedTo: 'Maya Patel',
    activityDate: '2024-05-28',
    dueDate: '2024-05-28',
    priority: 'High',
    status: 'Completed',
  },
  {
    id: 2,
    activityId: 'ACT-1002',
    type: 'Meeting',
    subject: 'Initial customer meeting',
    description: 'Met with Northwind Labs to review requirements and onboarding milestones.',
    relatedCustomerId: 2,
    relatedLeadId: '',
    assignedTo: 'Jason Lee',
    activityDate: '2024-05-29',
    dueDate: '2024-05-30',
    priority: 'Medium',
    status: 'Completed',
  },
  {
    id: 3,
    activityId: 'ACT-1003',
    type: 'Follow-up',
    subject: 'Pricing follow-up',
    description: 'Followed up with BrightPath AI on pricing and next steps for the proposal.',
    relatedCustomerId: '',
    relatedLeadId: 1,
    assignedTo: 'Maya Patel',
    activityDate: '2024-06-01',
    dueDate: '2024-06-04',
    priority: 'High',
    status: 'Pending',
  },
  {
    id: 4,
    activityId: 'ACT-1004',
    type: 'Task',
    subject: 'Proposal pack review',
    description: 'Review proposal pack with final pricing, governance, and onboarding details.',
    relatedCustomerId: '',
    relatedLeadId: 3,
    assignedTo: 'Anita Gomez',
    activityDate: '2024-05-15',
    dueDate: '2024-05-20',
    priority: 'Critical',
    status: 'Completed',
  },
  {
    id: 5,
    activityId: 'ACT-1005',
    type: 'Call',
    subject: 'Follow-up call with Red Cedar Works',
    description: 'Called to confirm budget timing and next feedback loop for the deal.',
    relatedCustomerId: '',
    relatedLeadId: 5,
    assignedTo: 'Priya Shah',
    activityDate: '2024-06-02',
    dueDate: '2024-06-06',
    priority: 'Medium',
    status: 'Pending',
  },
]

const apiKeyPermissionOptions = [
  'Customers: Read',
  'Customers: Write',
  'Leads: Read',
  'Leads: Write',
  'Activities: Read',
  'Activities: Write',
]

const apiKeyExpiryOptions = ['Never', '30 days', '90 days']

const defaultApiKeyFormState = {
  name: '',
  environment: 'Test',
  permissions: [...apiKeyPermissionOptions],
  expiry: 'Never',
}

const defaultSettingsState = {
  companyName: 'ClientHub',
  businessEmail: 'hello@clienthub.io',
  contactNumber: '+1 (415) 555-0190',
  website: 'https://www.clienthub.io',
  userName: 'Maya Patel',
  userEmail: 'maya@clienthub.io',
  userRole: 'Operations Lead',
  timezone: 'UTC-08:00 (Pacific Time)',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12-hour',
  apiBaseUrl: 'https://api.clienthub.io/v1',
  environment: 'Development',
  configurationStatus: 'Demo mode - not connected',
}

const SETTINGS_STORAGE_KEY = 'clienthub-settings-demo'

const readStoredSettings = () => {
  if (typeof window === 'undefined') return { ...defaultSettingsState }

  try {
    const stored = window.localStorage.getItem(SETTINGS_STORAGE_KEY)
    if (!stored) return { ...defaultSettingsState }

    const parsed = JSON.parse(stored)
    if (!parsed || typeof parsed !== 'object') return { ...defaultSettingsState }

    return { ...defaultSettingsState, ...parsed }
  } catch {
    return { ...defaultSettingsState }
  }
}

const initialApiKeys = [
  {
    id: 1,
    name: 'Web app',
    keyPrefix: 'ch_test_',
    lastFour: 'a1f2',
    environment: 'Test',
    permissions: ['Customers: Read', 'Customers: Write', 'Leads: Read', 'Activities: Read'],
    createdAt: '2024-06-10',
    expiresAt: 'Never',
    status: 'Active',
    lastUsedAt: '2024-06-13T10:15:00.000Z',
  },
  {
    id: 2,
    name: 'Mobile sync',
    keyPrefix: 'ch_test_',
    lastFour: '42ab',
    environment: 'Test',
    permissions: ['Customers: Read', 'Leads: Read'],
    createdAt: '2024-05-18',
    expiresAt: '30 days',
    status: 'Active',
    lastUsedAt: '2024-06-12T08:00:00.000Z',
  },
  {
    id: 3,
    name: 'Legacy portal',
    keyPrefix: 'ch_test_',
    lastFour: 'da3d',
    environment: 'Test',
    permissions: ['Customers: Read', 'Customers: Write', 'Leads: Read', 'Leads: Write'],
    createdAt: '2024-04-12',
    expiresAt: 'Never',
    status: 'Revoked',
    lastUsedAt: '2024-05-18T09:20:00.000Z',
  },
]

const demoUsageRecords = [
  { id: 1, dateTime: '2026-11-01T08:12:00', apiKeyName: 'Web app', endpoint: '/customers', method: 'GET', statusCode: 200, responseTime: 181, result: 'Success' },
  { id: 2, dateTime: '2026-11-01T08:24:00', apiKeyName: 'Web app', endpoint: '/customers', method: 'POST', statusCode: 201, responseTime: 214, result: 'Success' },
  { id: 3, dateTime: '2026-11-01T09:05:00', apiKeyName: 'Mobile sync', endpoint: '/leads', method: 'GET', statusCode: 200, responseTime: 233, result: 'Success' },
  { id: 4, dateTime: '2026-11-01T09:42:00', apiKeyName: 'Web app', endpoint: '/activities', method: 'GET', statusCode: 200, responseTime: 172, result: 'Success' },
  { id: 5, dateTime: '2026-11-02T10:18:00', apiKeyName: 'Legacy portal', endpoint: '/customers', method: 'GET', statusCode: 500, responseTime: 410, result: 'Failed' },
  { id: 6, dateTime: '2026-11-02T11:10:00', apiKeyName: 'Web app', endpoint: '/leads', method: 'POST', statusCode: 201, responseTime: 248, result: 'Success' },
  { id: 7, dateTime: '2026-11-02T13:58:00', apiKeyName: 'Mobile sync', endpoint: '/activities', method: 'GET', statusCode: 200, responseTime: 198, result: 'Success' },
  { id: 8, dateTime: '2026-11-03T07:40:00', apiKeyName: 'Web app', endpoint: '/customers', method: 'GET', statusCode: 200, responseTime: 164, result: 'Success' },
  { id: 9, dateTime: '2026-11-03T12:27:00', apiKeyName: 'Web app', endpoint: '/customers', method: 'POST', statusCode: 400, responseTime: 290, result: 'Failed' },
  { id: 10, dateTime: '2026-11-04T09:18:00', apiKeyName: 'Mobile sync', endpoint: '/leads', method: 'GET', statusCode: 200, responseTime: 220, result: 'Success' },
  { id: 11, dateTime: '2026-11-04T14:04:00', apiKeyName: 'Legacy portal', endpoint: '/leads', method: 'POST', statusCode: 503, responseTime: 560, result: 'Failed' },
  { id: 12, dateTime: '2026-11-05T08:51:00', apiKeyName: 'Web app', endpoint: '/activities', method: 'GET', statusCode: 200, responseTime: 176, result: 'Success' },
  { id: 13, dateTime: '2026-11-05T09:46:00', apiKeyName: 'Web app', endpoint: '/customers', method: 'GET', statusCode: 200, responseTime: 188, result: 'Success' },
  { id: 14, dateTime: '2026-11-05T16:12:00', apiKeyName: 'Mobile sync', endpoint: '/customers', method: 'POST', statusCode: 201, responseTime: 244, result: 'Success' },
  { id: 15, dateTime: '2026-11-06T07:52:00', apiKeyName: 'Web app', endpoint: '/leads', method: 'GET', statusCode: 200, responseTime: 220, result: 'Success' },
  { id: 16, dateTime: '2026-11-06T08:06:00', apiKeyName: 'Mobile sync', endpoint: '/activities', method: 'GET', statusCode: 429, responseTime: 310, result: 'Failed' },
]

const buildMaskedApiKey = (keyPrefix = 'ch_test_', lastFour = '0000') => {
  return `${keyPrefix}${'•'.repeat(16)}${lastFour}`
}

const normalizeApiKeyRecord = (record) => {
  if (!record || typeof record !== 'object') return null

  const name = typeof record.name === 'string' ? record.name.trim() : 'Unnamed API key'
  const keyPrefix = typeof record.keyPrefix === 'string' && record.keyPrefix.trim()
    ? record.keyPrefix.trim()
    : 'ch_test_'
  const lastFour = typeof record.lastFour === 'string' && record.lastFour.trim()
    ? record.lastFour.trim()
    : '0000'
  const environment = record.environment === 'Test' ? 'Test' : 'Test'
  const permissions = Array.isArray(record.permissions)
    ? record.permissions.filter((permission) => typeof permission === 'string' && permission.trim())
    : []
  const status = record.status === 'Revoked' ? 'Revoked' : 'Active'
  const expiresAt = typeof record.expiresAt === 'string' && record.expiresAt.trim() ? record.expiresAt : 'Never'
  const createdAt = typeof record.createdAt === 'string' && record.createdAt.trim() ? record.createdAt : new Date().toISOString().slice(0, 10)
  const lastUsedAt = typeof record.lastUsedAt === 'string' && record.lastUsedAt.trim() ? record.lastUsedAt : null

  return {
    id: Number(record.id) || Date.now(),
    name,
    keyPrefix,
    lastFour,
    environment,
    permissions,
    createdAt,
    expiresAt,
    status,
    lastUsedAt,
  }
}

const sanitizeStoredApiKeys = (values) => {
  if (!Array.isArray(values)) return []

  return values
    .map((record) => normalizeApiKeyRecord(record))
    .filter(Boolean)
}

const readStorageList = (key, fallback) => {
  if (typeof window === 'undefined') return fallback

  const raw = window.localStorage.getItem(key)
  if (!raw) return fallback

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

const readStoredApiKeys = () => {
  const stored = readStorageList('clienthub-api-keys', initialApiKeys)
  const sanitized = sanitizeStoredApiKeys(stored)

  if (typeof window !== 'undefined' && JSON.stringify(sanitized) !== JSON.stringify(stored)) {
    window.localStorage.setItem('clienthub-api-keys', JSON.stringify(sanitized))
  }

  return sanitized
}

const writeStorageList = (key, values) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(values))
}

const getActivityStatus = (activity) => {
  if (!activity) return 'Pending'

  if (activity.status === 'Completed') return 'Completed'

  if (activity.dueDate) {
    const currentDate = new Date()
    const dueDate = new Date(activity.dueDate)
    dueDate.setHours(0, 0, 0, 0)
    currentDate.setHours(0, 0, 0, 0)

    if (dueDate < currentDate) return 'Overdue'
  }

  return 'Pending'
}

const resolveCustomerName = (customerId, customers) => {
  if (!customerId) return '—'
  const match = customers.find((customer) => String(customer.id) === String(customerId))
  return match ? match.companyName : 'Unknown customer'
}

const resolveLeadName = (leadId, leads) => {
  if (!leadId) return '—'
  const match = leads.find((lead) => String(lead.id) === String(leadId))
  return match ? match.companyName : 'Unknown lead'
}

const getPriorityClass = (priority) => {
  switch (priority) {
    case 'Critical':
      return 'priority-critical'
    case 'High':
      return 'priority-high'
    case 'Medium':
      return 'priority-medium'
    default:
      return 'priority-low'
  }
}

function SidebarNav({ items, activeTab, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="brand-block">
        <div className="brand-mark">C</div>
        <div>
          <p className="brand-name">ClientHub</p>
          <span className="brand-subtitle">CRM Suite</span>
        </div>
      </div>

      <nav className="nav-list" aria-label="Sidebar navigation">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            className={`nav-item ${activeTab === item ? 'active' : ''}`}
            onClick={() => onSelect(item)}
          >
            <span className="nav-dot" aria-hidden="true" />
            {item}
          </button>
        ))}
      </nav>

      <div className="sidebar-card">
        <p className="small-label">System health</p>
        <strong>98.7%</strong>
        <span>All services operational</span>
      </div>
    </aside>
  )
}

function StatCard({ label, value, change, trend }) {
  return (
    <article className="stat-card">
      <div className="stat-header">
        <span className="stat-label">{label}</span>
        <span className={`stat-trend ${trend}`}>{change}</span>
      </div>
      <strong className="stat-value">{value}</strong>
    </article>
  )
}

function ActivityItem({ activity }) {
  return (
    <li className="activity-item">
      <div className="activity-bullet" aria-hidden="true" />
      <div className="activity-copy">
        <p>{activity.title}</p>
        <span>{activity.time}</span>
      </div>
      <span className="activity-tag">{activity.type}</span>
    </li>
  )
}

function CustomerRow({ customer }) {
  return (
    <div className="customer-row">
      <div className="customer-meta">
        <strong>{customer.name}</strong>
        <span>{customer.health}</span>
      </div>
      <div className="customer-progress" aria-label={`${customer.name} health progress`}>
        <span style={{ width: `${customer.value}%` }} />
      </div>
    </div>
  )
}

function formatDate(dateString) {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0)
}

function CustomerFormModal({ formData, errors, mode, onChange, onClose, onSubmit }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <p className="panel-kicker">Customer</p>
            <h3>{mode === 'add' ? 'Add customer' : 'Edit customer'}</h3>
          </div>
          <button type="button" className="close-button" onClick={onClose} aria-label="Close form">
            ×
          </button>
        </div>

        <div className="form-grid">
          <label className="field">
            <span>Customer ID</span>
            <input
              type="text"
              value={formData.customerId}
              onChange={(event) => onChange('customerId', event.target.value)}
            />
            {errors.customerId && <small>{errors.customerId}</small>}
          </label>

          <label className="field">
            <span>Company Name</span>
            <input
              type="text"
              value={formData.companyName}
              onChange={(event) => onChange('companyName', event.target.value)}
            />
            {errors.companyName && <small>{errors.companyName}</small>}
          </label>

          <label className="field">
            <span>Contact Person</span>
            <input
              type="text"
              value={formData.contactPerson}
              onChange={(event) => onChange('contactPerson', event.target.value)}
            />
            {errors.contactPerson && <small>{errors.contactPerson}</small>}
          </label>

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={formData.email}
              onChange={(event) => onChange('email', event.target.value)}
            />
            {errors.email && <small>{errors.email}</small>}
          </label>

          <label className="field">
            <span>Phone</span>
            <input
              type="tel"
              value={formData.phone}
              onChange={(event) => onChange('phone', event.target.value)}
            />
            {errors.phone && <small>{errors.phone}</small>}
          </label>

          <label className="field">
            <span>Status</span>
            <select
              value={formData.status}
              onChange={(event) => onChange('status', event.target.value)}
            >
              {statusOptions
                .filter((option) => option !== 'All')
                .map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </label>

          <label className="field full-span">
            <span>Registration Date</span>
            <input
              type="date"
              value={formData.registrationDate}
              onChange={(event) => onChange('registrationDate', event.target.value)}
            />
            {errors.registrationDate && <small>{errors.registrationDate}</small>}
          </label>
        </div>

        <div className="modal-actions">
          <button type="button" className="ghost-button" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="primary-button" onClick={onSubmit}>
            {mode === 'add' ? 'Add customer' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

function CustomerDetailsModal({ customer, onClose }) {
  if (!customer) return null

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card compact">
        <div className="modal-header">
          <div>
            <p className="panel-kicker">Profile</p>
            <h3>{customer.companyName}</h3>
          </div>
          <button type="button" className="close-button" onClick={onClose} aria-label="Close details">
            ×
          </button>
        </div>

        <dl className="details-list">
          <div><dt>Customer ID</dt><dd>{customer.customerId}</dd></div>
          <div><dt>Contact</dt><dd>{customer.contactPerson}</dd></div>
          <div><dt>Email</dt><dd>{customer.email}</dd></div>
          <div><dt>Phone</dt><dd>{customer.phone}</dd></div>
          <div><dt>Status</dt><dd>{customer.status}</dd></div>
          <div><dt>Registration</dt><dd>{formatDate(customer.registrationDate)}</dd></div>
        </dl>
      </div>
    </div>
  )
}

function LeadFormModal({ formData, errors, mode, onChange, onClose, onSubmit }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <p className="panel-kicker">Lead</p>
            <h3>{mode === 'add' ? 'Add lead' : 'Edit lead'}</h3>
          </div>
          <button type="button" className="close-button" onClick={onClose} aria-label="Close lead form">
            ×
          </button>
        </div>

        <div className="form-grid">
          <label className="field">
            <span>Lead ID</span>
            <input
              type="text"
              value={formData.leadId}
              onChange={(event) => onChange('leadId', event.target.value)}
            />
            {errors.leadId && <small>{errors.leadId}</small>}
          </label>

          <label className="field">
            <span>Company Name</span>
            <input
              type="text"
              value={formData.companyName}
              onChange={(event) => onChange('companyName', event.target.value)}
            />
            {errors.companyName && <small>{errors.companyName}</small>}
          </label>

          <label className="field">
            <span>Contact Person</span>
            <input
              type="text"
              value={formData.contactPerson}
              onChange={(event) => onChange('contactPerson', event.target.value)}
            />
            {errors.contactPerson && <small>{errors.contactPerson}</small>}
          </label>

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={formData.email}
              onChange={(event) => onChange('email', event.target.value)}
            />
            {errors.email && <small>{errors.email}</small>}
          </label>

          <label className="field">
            <span>Phone</span>
            <input
              type="tel"
              value={formData.phone}
              onChange={(event) => onChange('phone', event.target.value)}
            />
            {errors.phone && <small>{errors.phone}</small>}
          </label>

          <label className="field">
            <span>Lead Source</span>
            <select
              value={formData.leadSource}
              onChange={(event) => onChange('leadSource', event.target.value)}
            >
              {leadSourceOptions.filter((option) => option !== 'All').map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Estimated Deal Value</span>
            <input
              type="number"
              min="0"
              value={formData.estimatedDealValue}
              onChange={(event) => onChange('estimatedDealValue', event.target.value)}
            />
            {errors.estimatedDealValue && <small>{errors.estimatedDealValue}</small>}
          </label>

          <label className="field">
            <span>Lead Status</span>
            <select
              value={formData.leadStatus}
              onChange={(event) => onChange('leadStatus', event.target.value)}
            >
              {leadStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Assigned To</span>
            <input
              type="text"
              value={formData.assignedTo}
              onChange={(event) => onChange('assignedTo', event.target.value)}
            />
            {errors.assignedTo && <small>{errors.assignedTo}</small>}
          </label>

          <label className="field">
            <span>Created Date</span>
            <input
              type="date"
              value={formData.createdDate}
              onChange={(event) => onChange('createdDate', event.target.value)}
            />
            {errors.createdDate && <small>{errors.createdDate}</small>}
          </label>

          <label className="field full-span">
            <span>Next Follow-up</span>
            <input
              type="date"
              value={formData.nextFollowUp}
              onChange={(event) => onChange('nextFollowUp', event.target.value)}
            />
            {errors.nextFollowUp && <small>{errors.nextFollowUp}</small>}
          </label>
        </div>

        <div className="modal-actions">
          <button type="button" className="ghost-button" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="primary-button" onClick={onSubmit}>
            {mode === 'add' ? 'Add lead' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

function LeadDetailsModal({ lead, onClose, onConvert }) {
  if (!lead) return null

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card compact">
        <div className="modal-header">
          <div>
            <p className="panel-kicker">Lead profile</p>
            <h3>{lead.companyName}</h3>
          </div>
          <button type="button" className="close-button" onClick={onClose} aria-label="Close lead details">
            ×
          </button>
        </div>

        <dl className="details-list wider-list">
          <div><dt>Lead ID</dt><dd>{lead.leadId}</dd></div>
          <div><dt>Contact</dt><dd>{lead.contactPerson}</dd></div>
          <div><dt>Email</dt><dd>{lead.email}</dd></div>
          <div><dt>Phone</dt><dd>{lead.phone}</dd></div>
          <div><dt>Lead Source</dt><dd>{lead.leadSource}</dd></div>
          <div><dt>Value</dt><dd>{formatCurrency(lead.estimatedDealValue)}</dd></div>
          <div><dt>Status</dt><dd>{lead.leadStatus}</dd></div>
          <div><dt>Assigned To</dt><dd>{lead.assignedTo}</dd></div>
          <div><dt>Created</dt><dd>{formatDate(lead.createdDate)}</dd></div>
          <div><dt>Next Follow-up</dt><dd>{formatDate(lead.nextFollowUp)}</dd></div>
          <div><dt>Customer Link</dt><dd>{lead.convertedCustomerId ? 'Converted' : 'Not converted yet'}</dd></div>
          <div><dt>Converted ID</dt><dd>{lead.convertedCustomerId ?? '—'}</dd></div>
        </dl>

        {lead.leadStatus === 'Won' && !lead.convertedCustomerId && (
          <div className="modal-actions">
            <button type="button" className="primary-button" onClick={() => onConvert(lead)}>
              Convert to customer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function ActivityFormModal({ formData, errors, mode, onChange, onClose, onSubmit, customers, leads }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <p className="panel-kicker">Activity</p>
            <h3>{mode === 'add' ? 'Add activity' : 'Edit activity'}</h3>
          </div>
          <button type="button" className="close-button" onClick={onClose} aria-label="Close activity form">
            ×
          </button>
        </div>

        <div className="form-grid">
          <label className="field">
            <span>Activity ID</span>
            <input
              type="text"
              value={formData.activityId}
              onChange={(event) => onChange('activityId', event.target.value)}
            />
            {errors.activityId && <small>{errors.activityId}</small>}
          </label>

          <label className="field">
            <span>Type</span>
            <select value={formData.type} onChange={(event) => onChange('type', event.target.value)}>
              {activityTypes.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="field full-span">
            <span>Subject</span>
            <input
              type="text"
              value={formData.subject}
              onChange={(event) => onChange('subject', event.target.value)}
            />
            {errors.subject && <small>{errors.subject}</small>}
          </label>

          <label className="field full-span">
            <span>Description</span>
            <textarea
              rows="4"
              value={formData.description}
              onChange={(event) => onChange('description', event.target.value)}
            />
            {errors.description && <small>{errors.description}</small>}
          </label>

          <label className="field">
            <span>Related Customer</span>
            <select value={formData.relatedCustomerId} onChange={(event) => onChange('relatedCustomerId', event.target.value)}>
              <option value="">None</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>{customer.companyName}</option>
              ))}
            </select>
            {errors.relatedCustomerId && <small>{errors.relatedCustomerId}</small>}
          </label>

          <label className="field">
            <span>Related Lead</span>
            <select value={formData.relatedLeadId} onChange={(event) => onChange('relatedLeadId', event.target.value)}>
              <option value="">None</option>
              {leads.map((lead) => (
                <option key={lead.id} value={lead.id}>{lead.companyName}</option>
              ))}
            </select>
            {errors.relatedLeadId && <small>{errors.relatedLeadId}</small>}
          </label>

          <label className="field">
            <span>Assigned To</span>
            <input
              type="text"
              value={formData.assignedTo}
              onChange={(event) => onChange('assignedTo', event.target.value)}
            />
            {errors.assignedTo && <small>{errors.assignedTo}</small>}
          </label>

          <label className="field">
            <span>Priority</span>
            <select value={formData.priority} onChange={(event) => onChange('priority', event.target.value)}>
              {activityPriorityOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Activity Date</span>
            <input
              type="date"
              value={formData.activityDate}
              onChange={(event) => onChange('activityDate', event.target.value)}
            />
            {errors.activityDate && <small>{errors.activityDate}</small>}
          </label>

          <label className="field">
            <span>Due Date</span>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(event) => onChange('dueDate', event.target.value)}
            />
            {errors.dueDate && <small>{errors.dueDate}</small>}
          </label>

          <label className="field">
            <span>Status</span>
            <select value={formData.status} onChange={(event) => onChange('status', event.target.value)}>
              {['Pending', 'Completed'].map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="modal-actions">
          <button type="button" className="ghost-button" onClick={onClose}>Cancel</button>
          <button type="button" className="primary-button" onClick={onSubmit}>
            {mode === 'add' ? 'Add activity' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

function ActivityDetailsModal({ activity, customers, leads, onClose }) {
  if (!activity) return null

  const customerName = resolveCustomerName(activity.relatedCustomerId, customers)
  const leadName = resolveLeadName(activity.relatedLeadId, leads)

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card compact">
        <div className="modal-header">
          <div>
            <p className="panel-kicker">Activity</p>
            <h3>{activity.subject}</h3>
          </div>
          <button type="button" className="close-button" onClick={onClose} aria-label="Close activity details">
            ×
          </button>
        </div>

        <dl className="details-list wider-list">
          <div><dt>Activity ID</dt><dd>{activity.activityId}</dd></div>
          <div><dt>Type</dt><dd>{activity.type}</dd></div>
          <div><dt>Status</dt><dd>{getActivityStatus(activity)}</dd></div>
          <div><dt>Priority</dt><dd>{activity.priority}</dd></div>
          <div><dt>Owner</dt><dd>{activity.assignedTo}</dd></div>
          <div><dt>Activity Date</dt><dd>{formatDate(activity.activityDate)}</dd></div>
          <div><dt>Due Date</dt><dd>{formatDate(activity.dueDate)}</dd></div>
          <div><dt>Customer</dt><dd>{customerName}</dd></div>
          <div><dt>Lead</dt><dd>{leadName}</dd></div>
          <div className="full-span"><dt>Description</dt><dd>{activity.description || 'No description provided.'}</dd></div>
        </dl>
      </div>
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [customers, setCustomers] = useState(() => readStorageList('clienthub-customers', initialCustomers))
  const [leads, setLeads] = useState(() => readStorageList('clienthub-leads', initialLeads))
  const [activities, setActivities] = useState(() => readStorageList('clienthub-activities', initialActivities))
  const [apiKeys, setApiKeys] = useState(() => readStoredApiKeys())
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [formMode, setFormMode] = useState('add')
  const [formData, setFormData] = useState(defaultFormState)
  const [formErrors, setFormErrors] = useState({})
  const [leadSearchTerm, setLeadSearchTerm] = useState('')
  const [leadStatusFilter, setLeadStatusFilter] = useState('All')
  const [leadSourceFilter, setLeadSourceFilter] = useState('All')
  const [leadCurrentPage, setLeadCurrentPage] = useState(1)
  const [leadFormOpen, setLeadFormOpen] = useState(false)
  const [leadDetailsOpen, setLeadDetailsOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState(null)
  const [leadFormMode, setLeadFormMode] = useState('add')
  const [leadFormData, setLeadFormData] = useState(defaultLeadFormState)
  const [leadFormErrors, setLeadFormErrors] = useState({})
  const [leadViewMode, setLeadViewMode] = useState('table')
  const [leadSort, setLeadSort] = useState({ key: 'createdDate', direction: 'desc' })
  const [activitySearchTerm, setActivitySearchTerm] = useState('')
  const [activityTypeFilter, setActivityTypeFilter] = useState('All')
  const [activityStatusFilter, setActivityStatusFilter] = useState('All')
  const [activityPriorityFilter, setActivityPriorityFilter] = useState('All')
  const [activityDateFilter, setActivityDateFilter] = useState('All')
  const [activityCurrentPage, setActivityCurrentPage] = useState(1)
  const [activityFormOpen, setActivityFormOpen] = useState(false)
  const [activityFormMode, setActivityFormMode] = useState('add')
  const [activityFormData, setActivityFormData] = useState(defaultActivityFormState)
  const [activityFormErrors, setActivityFormErrors] = useState({})
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [activityDetailsOpen, setActivityDetailsOpen] = useState(false)
  const [activitySort, setActivitySort] = useState({ key: 'activityDate', direction: 'desc' })
  const [timelineScope, setTimelineScope] = useState('Customer')
  const [timelineTargetId, setTimelineTargetId] = useState('')
  const [usageSearchTerm, setUsageSearchTerm] = useState('')
  const [usageDateFilter, setUsageDateFilter] = useState('All')
  const [usageKeyFilter, setUsageKeyFilter] = useState('All')
  const [usageStatusFilter, setUsageStatusFilter] = useState('All')
  const [apiKeySearchTerm, setApiKeySearchTerm] = useState('')
  const [apiStatusFilter, setApiStatusFilter] = useState('All')
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false)
  const [apiKeyForm, setApiKeyForm] = useState(defaultApiKeyFormState)
  const [apiKeyFormErrors, setApiKeyFormErrors] = useState({})
  const [newlyCreatedApiKey, setNewlyCreatedApiKey] = useState(null)
  const [settingsDraft, setSettingsDraft] = useState(() => readStoredSettings())
  const [savedSettings, setSavedSettings] = useState(() => readStoredSettings())
  const [settingsMessage, setSettingsMessage] = useState('')

  const pageSize = 5
  const leadPageSize = 5
  const activityPageSize = 5

  useEffect(() => {
    writeStorageList('clienthub-customers', customers)
  }, [customers])

  useEffect(() => {
    writeStorageList('clienthub-leads', leads)
  }, [leads])

  useEffect(() => {
    writeStorageList('clienthub-activities', activities)
  }, [activities])

  useEffect(() => {
    const safeApiKeys = apiKeys.map((apiKey) => ({
      id: apiKey.id,
      name: apiKey.name,
      keyPrefix: apiKey.keyPrefix,
      lastFour: apiKey.lastFour,
      environment: apiKey.environment,
      permissions: Array.isArray(apiKey.permissions) ? apiKey.permissions : [],
      createdAt: apiKey.createdAt,
      expiresAt: apiKey.expiresAt,
      status: apiKey.status,
      lastUsedAt: apiKey.lastUsedAt,
    }))

    writeStorageList('clienthub-api-keys', safeApiKeys)
  }, [apiKeys])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(savedSettings))
    }
  }, [savedSettings])

  const summaryCards = useMemo(() => {
    if (activeTab === 'Customers') {
      return [
        { label: 'Enterprise accounts', value: '146' },
        { label: 'Renewals this quarter', value: '32' },
        { label: 'Avg. satisfaction', value: '4.8/5' },
      ]
    }

    if (activeTab === 'Leads') {
      return [
        { label: 'Qualified leads', value: '248' },
        { label: 'Demo scheduled', value: '37' },
        { label: 'Win rate', value: '29%' },
      ]
    }

    if (activeTab === 'API Management') {
      return [
        { label: 'Keys issued', value: '328' },
        { label: 'Rotations', value: '14' },
        { label: 'Uptime', value: '99.9%' },
      ]
    }

    return [
      { label: 'Open opportunities', value: '89' },
      { label: 'Retention rate', value: '94.2%' },
      { label: 'Avg. response time', value: '1.2h' },
    ]
  }, [activeTab])

  const filteredCustomers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return customers.filter((customer) => {
      const withinSearch =
        !normalizedSearch ||
        customer.companyName.toLowerCase().includes(normalizedSearch) ||
        customer.email.toLowerCase().includes(normalizedSearch)

      const withinStatus = statusFilter === 'All' || customer.status === statusFilter

      return withinSearch && withinStatus
    })
  }, [customers, searchTerm, statusFilter])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / pageSize))
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const activeSection = sectionMeta[activeTab]

  const handleFieldChange = (field, value) => {
    setFormData((previous) => ({ ...previous, [field]: value }))
    setFormErrors((previous) => ({ ...previous, [field]: '' }))
  }

  const handleLeadFieldChange = (field, value) => {
    setLeadFormData((previous) => ({ ...previous, [field]: value }))
    setLeadFormErrors((previous) => ({ ...previous, [field]: '' }))
  }

  const isDuplicateCustomerRecord = (candidate, ignoredId = null) => {
    const normalizedCompany = candidate.companyName.trim().toLowerCase()
    const normalizedEmail = candidate.email.trim().toLowerCase()

    return customers.some(
      (customer) =>
        String(customer.id) !== String(ignoredId) &&
        (customer.companyName.trim().toLowerCase() === normalizedCompany ||
          customer.email.trim().toLowerCase() === normalizedEmail)
    )
  }

  const validateCustomerForm = () => {
    const errors = {}

    if (!formData.customerId.trim()) {
      errors.customerId = 'Customer ID is required.'
    }

    if (!formData.companyName.trim()) {
      errors.companyName = 'Company name is required.'
    }

    if (!formData.contactPerson.trim()) {
      errors.contactPerson = 'Contact person is required.'
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'A valid email is required.'
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.'
    }

    if (!formData.registrationDate) {
      errors.registrationDate = 'Registration date is required.'
    }

    return errors
  }

  const validateLeadForm = () => {
    const errors = {}

    if (!leadFormData.leadId.trim()) {
      errors.leadId = 'Lead ID is required.'
    }

    if (!leadFormData.companyName.trim()) {
      errors.companyName = 'Company name is required.'
    }

    if (!leadFormData.contactPerson.trim()) {
      errors.contactPerson = 'Contact person is required.'
    }

    if (!leadFormData.email.trim()) {
      errors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadFormData.email)) {
      errors.email = 'A valid email is required.'
    }

    if (!leadFormData.phone.trim()) {
      errors.phone = 'Phone number is required.'
    }

    if (!leadFormData.assignedTo.trim()) {
      errors.assignedTo = 'Assigned owner is required.'
    }

    if (!leadFormData.createdDate) {
      errors.createdDate = 'Created date is required.'
    }

    if (!leadFormData.nextFollowUp) {
      errors.nextFollowUp = 'Next follow-up is required.'
    }

    const numericValue = Number(leadFormData.estimatedDealValue)
    if (!leadFormData.estimatedDealValue || Number.isNaN(numericValue) || numericValue <= 0) {
      errors.estimatedDealValue = 'Estimated deal value must be greater than zero.'
    }

    return errors
  }

  const openAddCustomer = () => {
    setFormMode('add')
    setFormData({
      ...defaultFormState,
      customerId: `CUST-${String(customers.length + 1001).padStart(4, '0')}`,
    })
    setFormErrors({})
    setIsFormOpen(true)
  }

  const openEditCustomer = (customer) => {
    setFormMode('edit')
    setFormData({ ...customer })
    setFormErrors({})
    setIsFormOpen(true)
  }

  const closeCustomerForm = () => {
    setIsFormOpen(false)
    setFormErrors({})
  }

  const submitCustomer = () => {
    const errors = validateCustomerForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const trimmedCustomer = {
      ...formData,
      companyName: formData.companyName.trim(),
      contactPerson: formData.contactPerson.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
    }

    if (isDuplicateCustomerRecord(trimmedCustomer, formMode === 'edit' ? formData.id : null)) {
      window.alert('A matching customer already exists. Duplicate customers are blocked.')
      return
    }

    if (formMode === 'add') {
      const newCustomer = {
        ...trimmedCustomer,
        id: Date.now(),
      }

      setCustomers((previous) => [newCustomer, ...previous])
    } else {
      setCustomers((previous) =>
        previous.map((customer) =>
          customer.id === formData.id ? { ...trimmedCustomer } : customer
        )
      )
    }

    closeCustomerForm()
  }

  const deleteCustomer = (customer) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${customer.companyName}?`)

    if (!confirmed) return

    setCustomers((previous) => previous.filter((item) => item.id !== customer.id))

    if (selectedCustomer?.id === customer.id) {
      setSelectedCustomer(null)
      setIsDetailsOpen(false)
    }
  }

  const openAddLead = () => {
    setLeadFormMode('add')
    setLeadFormData({
      ...defaultLeadFormState,
      leadId: `LEAD-${String(leads.length + 2001).padStart(4, '0')}`,
    })
    setLeadFormErrors({})
    setLeadFormOpen(true)
  }

  const openEditLead = (lead) => {
    setLeadFormMode('edit')
    setLeadFormData({
      ...lead,
      estimatedDealValue: String(lead.estimatedDealValue ?? ''),
    })
    setLeadFormErrors({})
    setLeadFormOpen(true)
  }

  const closeLeadForm = () => {
    setLeadFormOpen(false)
    setLeadFormErrors({})
  }

  const submitLead = () => {
    const errors = validateLeadForm()
    if (Object.keys(errors).length > 0) {
      setLeadFormErrors(errors)
      return
    }

    const normalizedLead = {
      ...leadFormData,
      companyName: leadFormData.companyName.trim(),
      contactPerson: leadFormData.contactPerson.trim(),
      email: leadFormData.email.trim(),
      phone: leadFormData.phone.trim(),
      assignedTo: leadFormData.assignedTo.trim(),
      estimatedDealValue: Number(leadFormData.estimatedDealValue),
    }

    if (leadFormMode === 'add') {
      setLeads((previous) => [{
        ...normalizedLead,
        id: Date.now(),
        convertedCustomerId: null,
      }, ...previous])
    } else {
      setLeads((previous) =>
        previous.map((lead) =>
          lead.id === leadFormData.id ? { ...normalizedLead } : lead
        )
      )
    }

    closeLeadForm()
  }

  const deleteLead = (lead) => {
    const confirmed = window.confirm(`Delete lead ${lead.companyName}?`)
    if (!confirmed) return

    setLeads((previous) => previous.filter((item) => item.id !== lead.id))

    if (selectedLead?.id === lead.id) {
      setSelectedLead(null)
      setLeadDetailsOpen(false)
    }
  }

  const moveLeadStage = (leadId, direction) => {
    setLeads((previous) =>
      previous.map((lead) => {
        if (lead.id !== leadId) return lead

        const stageIndex = leadStatuses.indexOf(lead.leadStatus)
        const nextIndex = Math.min(
          leadStatuses.length - 1,
          Math.max(0, stageIndex + direction)
        )

        return {
          ...lead,
          leadStatus: leadStatuses[nextIndex],
        }
      })
    )
  }

  const convertLeadToCustomer = (lead) => {
    if (lead.leadStatus !== 'Won') {
      window.alert('Only Won leads can be converted into customers.')
      return
    }

    if (lead.convertedCustomerId) {
      window.alert('This lead has already been converted to a customer.')
      return
    }

    const normalizedCompany = lead.companyName.trim().toLowerCase()
    const normalizedEmail = lead.email.trim().toLowerCase()
    const duplicateCustomer = customers.some(
      (customer) =>
        customer.companyName.trim().toLowerCase() === normalizedCompany ||
        customer.email.trim().toLowerCase() === normalizedEmail
    )

    if (duplicateCustomer) {
      window.alert('A matching customer already exists. Duplicate conversion is blocked.')
      return
    }

    const maxCustomerNumber = customers.reduce((max, customer) => {
      const match = String(customer.customerId).match(/(\d+)/)
      const value = match ? Number(match[1]) : 0
      return Math.max(max, value)
    }, 0)

    const generatedCustomerId = `CUST-${String(maxCustomerNumber + 1).padStart(4, '0')}`
    const newCustomer = {
      id: Date.now(),
      customerId: generatedCustomerId,
      companyName: lead.companyName.trim(),
      contactPerson: lead.contactPerson.trim(),
      email: lead.email.trim(),
      phone: lead.phone.trim(),
      status: 'Active',
      registrationDate: new Date().toISOString().slice(0, 10),
    }

    setCustomers((previous) => [newCustomer, ...previous])
    setLeads((previous) =>
      previous.map((item) =>
        item.id === lead.id
          ? {
              ...item,
              convertedCustomerId: generatedCustomerId,
            }
          : item
      )
    )

    setSelectedLead((previous) =>
      previous && previous.id === lead.id
        ? { ...previous, convertedCustomerId: generatedCustomerId }
        : previous
    )

    window.alert(`Lead converted successfully into customer ${generatedCustomerId}.`)
  }

  const filteredLeads = useMemo(() => {
    const normalizedSearch = leadSearchTerm.trim().toLowerCase()

    return leads.filter((lead) => {
      const searchMatches =
        !normalizedSearch ||
        lead.companyName.toLowerCase().includes(normalizedSearch) ||
        lead.email.toLowerCase().includes(normalizedSearch) ||
        lead.contactPerson.toLowerCase().includes(normalizedSearch)

      const statusMatches = leadStatusFilter === 'All' || lead.leadStatus === leadStatusFilter
      const sourceMatches = leadSourceFilter === 'All' || lead.leadSource === leadSourceFilter

      return searchMatches && statusMatches && sourceMatches
    })
  }, [leads, leadSearchTerm, leadStatusFilter, leadSourceFilter])

  useEffect(() => {
    setLeadCurrentPage(1)
  }, [leadSearchTerm, leadStatusFilter, leadSourceFilter])

  const sortedLeads = useMemo(() => {
    const sorted = [...filteredLeads]

    sorted.sort((left, right) => {
      const direction = leadSort.direction === 'asc' ? 1 : -1
      const leftValue = left[leadSort.key]
      const rightValue = right[leadSort.key]

      if (leadSort.key === 'estimatedDealValue') {
        return (Number(leftValue) - Number(rightValue)) * direction
      }

      if (leadSort.key === 'createdDate' || leadSort.key === 'nextFollowUp') {
        return (new Date(leftValue) - new Date(rightValue)) * direction
      }

      return String(leftValue ?? '').localeCompare(String(rightValue ?? '')) * direction
    })

    return sorted
  }, [filteredLeads, leadSort])

  const totalLeadPages = Math.max(1, Math.ceil(sortedLeads.length / leadPageSize))
  const paginatedLeads = sortedLeads.slice(
    (leadCurrentPage - 1) * leadPageSize,
    leadCurrentPage * leadPageSize
  )

  const pipelineData = leadStatuses.map((status) => {
    const stageLeads = leads.filter((lead) => lead.leadStatus === status)
    const totalValue = stageLeads.reduce((sum, lead) => sum + Number(lead.estimatedDealValue || 0), 0)

    return {
      status,
      leads: stageLeads,
      totalValue,
    }
  })

  const handleLeadSort = (key) => {
    setLeadSort((previous) => ({
      key,
      direction:
        previous.key === key && previous.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const getSortIndicator = (key) => {
    if (leadSort.key !== key) return ''
    return leadSort.direction === 'asc' ? ' ↑' : ' ↓'
  }

  const renderDashboard = () => (
    <>
      <div className="page-header">
        <div>
          <p className="eyebrow">Performance snapshot</p>
          <h1>{activeSection.heading}</h1>
        </div>
        <button type="button" className="primary-button">
          + New report
        </button>
      </div>

      <p className="page-subtitle">{activeSection.subtitle}</p>

      <section className="stats-grid" aria-label="Key metrics">
        {statData.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="summary-strip" aria-label="Section summary">
        {summaryCards.map((card) => (
          <div key={card.label} className="summary-card">
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </div>
        ))}
      </section>

      <section className="panel-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Recent</p>
              <h2>Recent Activities</h2>
            </div>
            <button type="button" className="ghost-button">
              View all
            </button>
          </div>

          <ul className="activity-list">
            {recentActivities.map((activity) => (
              <ActivityItem key={activity.title} activity={activity} />
            ))}
          </ul>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Overview</p>
              <h2>Customer overview</h2>
            </div>
            <button type="button" className="ghost-button">
              Export
            </button>
          </div>

          <div className="customer-list">
            {customerOverview.map((customer) => (
              <CustomerRow key={customer.name} customer={customer} />
            ))}
          </div>
        </article>
      </section>
    </>
  )

  const renderCustomers = () => (
    <section className="customers-page">
      <div className="page-header customers-header">
        <div>
          <p className="eyebrow">Directory</p>
          <h1>Customer Management</h1>
        </div>
        <button type="button" className="primary-button" onClick={openAddCustomer}>
          + Add customer
        </button>
      </div>

      <div className="customers-toolbar">
        <label className="toolbar-search">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Search by company or email"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>

        <label className="toolbar-filter">
          <span>Status</span>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="table-wrap">
        <table className="customers-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Company Name</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Registration Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-state">
                  No customers match the current filters.
                </td>
              </tr>
            ) : (
              paginatedCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.customerId}</td>
                  <td>{customer.companyName}</td>
                  <td>{customer.contactPerson}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>
                    <span className={`status-pill ${customer.status.toLowerCase()}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td>{formatDate(customer.registrationDate)}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="row-button view"
                        onClick={() => {
                          setSelectedCustomer(customer)
                          setIsDetailsOpen(true)
                        }}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="row-button edit"
                        onClick={() => openEditCustomer(customer)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="row-button delete"
                        onClick={() => deleteCustomer(customer)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filteredCustomers.length > pageSize && (
        <div className="pagination" aria-label="Customer pagination">
          <button
            type="button"
            className="ghost-button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((previous) => Math.max(1, previous - 1))}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            className="ghost-button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((previous) => Math.min(totalPages, previous + 1))}
          >
            Next
          </button>
        </div>
      )}
    </section>
  )

  const renderLeads = () => (
    <section className="lead-page">
      <div className="page-header customers-header">
        <div>
          <p className="eyebrow">Sales</p>
          <h1>Lead Management</h1>
        </div>
        <div className="lead-toggle-group">
          <button
            type="button"
            className={leadViewMode === 'table' ? 'primary-button' : 'ghost-button'}
            onClick={() => setLeadViewMode('table')}
          >
            Table view
          </button>
          <button
            type="button"
            className={leadViewMode === 'pipeline' ? 'primary-button' : 'ghost-button'}
            onClick={() => setLeadViewMode('pipeline')}
          >
            Pipeline view
          </button>
        </div>
      </div>

      <div className="customers-toolbar lead-toolbar">
        <label className="toolbar-search">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Search leads by company, contact, or email"
            value={leadSearchTerm}
            onChange={(event) => setLeadSearchTerm(event.target.value)}
          />
        </label>

        <label className="toolbar-filter">
          <span>Status</span>
          <select value={leadStatusFilter} onChange={(event) => setLeadStatusFilter(event.target.value)}>
            {['All', ...leadStatuses].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="toolbar-filter">
          <span>Source</span>
          <select value={leadSourceFilter} onChange={(event) => setLeadSourceFilter(event.target.value)}>
            {leadSourceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      {leadViewMode === 'table' ? (
        <>
          <div className="table-wrap">
            <table className="customers-table lead-table">
              <thead>
                <tr>
                  <th>
                    <button type="button" className="sort-button" onClick={() => handleLeadSort('leadId')}>
                      Lead ID{getSortIndicator('leadId')}
                    </button>
                  </th>
                  <th>
                    <button type="button" className="sort-button" onClick={() => handleLeadSort('companyName')}>
                      Company Name{getSortIndicator('companyName')}
                    </button>
                  </th>
                  <th>Contact Person</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Lead Source</th>
                  <th>
                    <button type="button" className="sort-button" onClick={() => handleLeadSort('estimatedDealValue')}>
                      Estimated Deal Value{getSortIndicator('estimatedDealValue')}
                    </button>
                  </th>
                  <th>
                    <button type="button" className="sort-button" onClick={() => handleLeadSort('leadStatus')}>
                      Lead Status{getSortIndicator('leadStatus')}
                    </button>
                  </th>
                  <th>Assigned To</th>
                  <th>
                    <button type="button" className="sort-button" onClick={() => handleLeadSort('createdDate')}>
                      Created Date{getSortIndicator('createdDate')}
                    </button>
                  </th>
                  <th>
                    <button type="button" className="sort-button" onClick={() => handleLeadSort('nextFollowUp')}>
                      Next Follow-up{getSortIndicator('nextFollowUp')}
                    </button>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLeads.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="empty-state">
                      No leads match the current filters.
                    </td>
                  </tr>
                ) : (
                  paginatedLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td>{lead.leadId}</td>
                      <td>{lead.companyName}</td>
                      <td>{lead.contactPerson}</td>
                      <td>{lead.email}</td>
                      <td>{lead.phone}</td>
                      <td>{lead.leadSource}</td>
                      <td>{formatCurrency(lead.estimatedDealValue)}</td>
                      <td>
                        <span className={`status-pill ${lead.leadStatus.toLowerCase().replace(/\s+/g, '-')}`}>
                          {lead.leadStatus}
                        </span>
                      </td>
                      <td>{lead.assignedTo}</td>
                      <td>{formatDate(lead.createdDate)}</td>
                      <td>{formatDate(lead.nextFollowUp)}</td>
                      <td>
                        <div className="table-actions">
                          <button
                            type="button"
                            className="row-button view"
                            onClick={() => {
                              setSelectedLead(lead)
                              setLeadDetailsOpen(true)
                            }}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="row-button edit"
                            onClick={() => openEditLead(lead)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="row-button delete"
                            onClick={() => deleteLead(lead)}
                          >
                            Delete
                          </button>
                          {lead.leadStatus === 'Won' && !lead.convertedCustomerId && (
                            <button
                              type="button"
                              className="row-button view"
                              onClick={() => convertLeadToCustomer(lead)}
                            >
                              Convert
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {sortedLeads.length > leadPageSize && (
            <div className="pagination" aria-label="Lead pagination">
              <button
                type="button"
                className="ghost-button"
                disabled={leadCurrentPage === 1}
                onClick={() => setLeadCurrentPage((previous) => Math.max(1, previous - 1))}
              >
                Previous
              </button>
              <span>
                Page {leadCurrentPage} of {totalLeadPages}
              </span>
              <button
                type="button"
                className="ghost-button"
                disabled={leadCurrentPage === totalLeadPages}
                onClick={() => setLeadCurrentPage((previous) => Math.min(totalLeadPages, previous + 1))}
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="pipeline-board">
          {pipelineData.map(({ status, leads: stageLeads, totalValue }) => (
            <div key={status} className="pipeline-column">
              <div className="pipeline-header">
                <div>
                  <span className="pipeline-title">{status}</span>
                  <strong>{stageLeads.length}</strong>
                </div>
                <span className="pipeline-total">{formatCurrency(totalValue)}</span>
              </div>

              <div className="pipeline-list">
                {stageLeads.length === 0 ? (
                  <div className="pipeline-empty">No leads</div>
                ) : (
                  stageLeads.map((lead) => (
                    <article key={lead.id} className="pipeline-card">
                      <div className="pipeline-card-top">
                        <strong>{lead.companyName}</strong>
                        <span className={`status-pill ${lead.leadStatus.toLowerCase().replace(/\s+/g, '-')}`}>
                          {lead.leadStatus}
                        </span>
                      </div>
                      <p>{lead.contactPerson}</p>
                      <span className="pipeline-value">{formatCurrency(lead.estimatedDealValue)}</span>
                      <div className="pipeline-card-actions">
                        <button
                          type="button"
                          className="mini-button"
                          disabled={lead.leadStatus === 'New'}
                          onClick={() => moveLeadStage(lead.id, -1)}
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          className="mini-button secondary"
                          onClick={() => {
                            setSelectedLead(lead)
                            setLeadDetailsOpen(true)
                          }}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="mini-button"
                          disabled={lead.leadStatus === 'Lost'}
                          onClick={() => moveLeadStage(lead.id, 1)}
                        >
                          →
                        </button>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="table-actions top-margin">
        <button type="button" className="primary-button" onClick={openAddLead}>
          + Add lead
        </button>
      </div>

      {leadFormOpen && (
        <LeadFormModal
          formData={leadFormData}
          errors={leadFormErrors}
          mode={leadFormMode}
          onChange={handleLeadFieldChange}
          onClose={closeLeadForm}
          onSubmit={submitLead}
        />
      )}

      {leadDetailsOpen && (
        <LeadDetailsModal
          lead={selectedLead}
          onClose={() => setLeadDetailsOpen(false)}
          onConvert={convertLeadToCustomer}
        />
      )}
    </section>
  )

  const handleActivityFieldChange = (field, value) => {
    setActivityFormData((previous) => ({ ...previous, [field]: value }))
    setActivityFormErrors((previous) => ({ ...previous, [field]: '' }))
  }

  const validateActivityForm = () => {
    const errors = {}

    if (!activityFormData.activityId.trim()) {
      errors.activityId = 'Activity ID is required.'
    }

    if (!activityFormData.subject.trim()) {
      errors.subject = 'Activity subject is required.'
    }

    if (!activityFormData.description.trim()) {
      errors.description = 'Description is required.'
    }

    if (!activityFormData.assignedTo.trim()) {
      errors.assignedTo = 'Assigned owner is required.'
    }

    if (!activityFormData.activityDate) {
      errors.activityDate = 'Activity date is required.'
    }

    if (!activityFormData.dueDate) {
      errors.dueDate = 'Due date is required.'
    }

    if (!activityFormData.relatedCustomerId && !activityFormData.relatedLeadId) {
      errors.relatedCustomerId = 'Select a customer or lead.'
      errors.relatedLeadId = 'Select a customer or lead.'
    }

    return errors
  }

  const openAddActivity = () => {
    setActivityFormMode('add')
    setActivityFormData({
      ...defaultActivityFormState,
      activityId: `ACT-${String(activities.length + 1001).padStart(4, '0')}`,
    })
    setActivityFormErrors({})
    setActivityFormOpen(true)
  }

  const openEditActivity = (activity) => {
    setActivityFormMode('edit')
    setActivityFormData({ ...activity })
    setActivityFormErrors({})
    setActivityFormOpen(true)
  }

  const closeActivityForm = () => {
    setActivityFormOpen(false)
    setActivityFormErrors({})
  }

  const completeActivity = (activityId) => {
    setActivities((previous) =>
      previous.map((item) =>
        item.id === activityId ? { ...item, status: 'Completed' } : item
      )
    )
  }

  const rescheduleActivity = (activityId) => {
    const nextDate = new Date()
    nextDate.setDate(nextDate.getDate() + 7)
    const iso = nextDate.toISOString().slice(0, 10)

    setActivities((previous) =>
      previous.map((item) =>
        item.id === activityId ? { ...item, dueDate: iso, status: 'Pending' } : item
      )
    )
  }

  const deleteActivity = (activityId) => {
    const confirmed = window.confirm('Delete this activity?')
    if (!confirmed) return

    setActivities((previous) => previous.filter((item) => item.id !== activityId))

    if (selectedActivity?.id === activityId) {
      setSelectedActivity(null)
      setActivityDetailsOpen(false)
    }
  }

  const submitActivity = () => {
    const errors = validateActivityForm()
    if (Object.keys(errors).length > 0) {
      setActivityFormErrors(errors)
      return
    }

    const normalizedActivity = {
      ...activityFormData,
      subject: activityFormData.subject.trim(),
      description: activityFormData.description.trim(),
      assignedTo: activityFormData.assignedTo.trim(),
      relatedCustomerId: activityFormData.relatedCustomerId || '',
      relatedLeadId: activityFormData.relatedLeadId || '',
      status: activityFormData.status || 'Pending',
    }

    if (activityFormMode === 'add') {
      setActivities((previous) => [{
        ...normalizedActivity,
        id: Date.now(),
      }, ...previous])
    } else {
      setActivities((previous) =>
        previous.map((activity) =>
          activity.id === activityFormData.id ? { ...normalizedActivity } : activity
        )
      )
    }

    closeActivityForm()
  }

  const filteredActivities = useMemo(() => {
    const normalizedQuery = activitySearchTerm.trim().toLowerCase()

    return activities.filter((activity) => {
      const relatedCustomer = resolveCustomerName(activity.relatedCustomerId, customers)
      const relatedLead = resolveLeadName(activity.relatedLeadId, leads)
      const summaryText = [
        activity.subject,
        activity.description,
        activity.type,
        activity.assignedTo,
        relatedCustomer,
        relatedLead,
      ].join(' ').toLowerCase()

      const matchesSearch = !normalizedQuery || summaryText.includes(normalizedQuery)
      const matchesType = activityTypeFilter === 'All' || activity.type === activityTypeFilter
      const matchesPriority = activityPriorityFilter === 'All' || activity.priority === activityPriorityFilter
      const statusValue = getActivityStatus(activity)
      const matchesStatus = activityStatusFilter === 'All' || statusValue === activityStatusFilter

      let matchesDate = true
      if (activityDateFilter !== 'All') {
        const today = new Date()
        const currentDate = new Date(activity.activityDate || activity.dueDate)
        currentDate.setHours(0, 0, 0, 0)
        today.setHours(0, 0, 0, 0)

        if (activityDateFilter === 'Today') {
          matchesDate = currentDate.getTime() === today.getTime()
        } else if (activityDateFilter === 'This week') {
          const endDate = new Date(today)
          endDate.setDate(today.getDate() + 7)
          matchesDate = currentDate >= today && currentDate <= endDate
        } else if (activityDateFilter === 'This month') {
          matchesDate = currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()
        } else if (activityDateFilter === 'Overdue') {
          matchesDate = statusValue === 'Overdue'
        }
      }

      return matchesSearch && matchesType && matchesPriority && matchesStatus && matchesDate
    })
  }, [activities, activitySearchTerm, activityTypeFilter, activityStatusFilter, activityPriorityFilter, activityDateFilter, customers, leads])

  useEffect(() => {
    setActivityCurrentPage(1)
  }, [activitySearchTerm, activityTypeFilter, activityStatusFilter, activityPriorityFilter, activityDateFilter])

  const sortedActivities = useMemo(() => {
    const sorted = [...filteredActivities]
    const direction = activitySort.direction === 'asc' ? 1 : -1

    sorted.sort((left, right) => {
      const leftValue = left[activitySort.key]
      const rightValue = right[activitySort.key]

      if (['activityDate', 'dueDate'].includes(activitySort.key)) {
        return (new Date(leftValue || 0) - new Date(rightValue || 0)) * direction
      }

      return String(leftValue ?? '').localeCompare(String(rightValue ?? '')) * direction
    })

    return sorted
  }, [filteredActivities, activitySort])

  const totalActivityPages = Math.max(1, Math.ceil(sortedActivities.length / activityPageSize))
  const paginatedActivities = sortedActivities.slice(
    (activityCurrentPage - 1) * activityPageSize,
    activityCurrentPage * activityPageSize
  )

  const activityOverview = useMemo(() => {
    const total = activities.length
    const pending = activities.filter((activity) => getActivityStatus(activity) === 'Pending').length
    const completed = activities.filter((activity) => getActivityStatus(activity) === 'Completed').length
    const overdue = activities.filter((activity) => getActivityStatus(activity) === 'Overdue').length

    const upcoming = activities.filter((activity) => {
      if (getActivityStatus(activity) === 'Completed') return false
      if (!activity.dueDate) return false

      const dueDate = new Date(activity.dueDate)
      const today = new Date()
      dueDate.setHours(0, 0, 0, 0)
      today.setHours(0, 0, 0, 0)

      const upcomingWindow = new Date(today)
      upcomingWindow.setDate(today.getDate() + 7)
      return dueDate >= today && dueDate <= upcomingWindow
    }).length

    return [
      { label: 'Total activities', value: total },
      { label: 'Pending', value: pending },
      { label: 'Completed', value: completed },
      { label: 'Overdue', value: overdue },
      { label: 'Follow-ups next 7 days', value: upcoming },
    ]
  }, [activities])

  const timelineEntities = useMemo(() => {
    const customerOptions = customers.map((customer) => ({
      id: String(customer.id),
      label: customer.companyName,
      type: 'customer',
    }))
    const leadOptions = leads.map((lead) => ({
      id: String(lead.id),
      label: lead.companyName,
      type: 'lead',
    }))

    return timelineScope === 'Customer' ? customerOptions : leadOptions
  }, [customers, leads, timelineScope])

  useEffect(() => {
    if (!timelineEntities.length) {
      setTimelineTargetId('')
      return
    }

    if (!timelineTargetId || !timelineEntities.some((option) => option.id === timelineTargetId)) {
      setTimelineTargetId(timelineEntities[0].id)
    }
  }, [timelineEntities, timelineTargetId])

  const timelineActivities = useMemo(() => {
    if (!timelineTargetId) return []

    const scopedActivities = activities.filter((activity) => {
      if (timelineScope === 'Customer') {
        return String(activity.relatedCustomerId) === String(timelineTargetId)
      }

      return String(activity.relatedLeadId) === String(timelineTargetId)
    })

    return [...scopedActivities].sort((left, right) => {
      const leftDate = new Date(left.activityDate || left.dueDate || 0)
      const rightDate = new Date(right.activityDate || right.dueDate || 0)
      return rightDate - leftDate
    })
  }, [activities, timelineScope, timelineTargetId])

  const handleActivitySort = (key) => {
    setActivitySort((previous) => ({
      key,
      direction: previous.key === key && previous.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const getActivitySortIndicator = (key) => {
    if (activitySort.key !== key) return ''
    return activitySort.direction === 'asc' ? ' ↑' : ' ↓'
  }

  const apiKeySummary = useMemo(() => {
    const total = apiKeys.length
    const active = apiKeys.filter((key) => key.status === 'Active').length
    const revoked = apiKeys.filter((key) => key.status === 'Revoked').length

    return { total, active, revoked }
  }, [apiKeys])

  const filteredApiKeys = useMemo(() => {
    const query = apiKeySearchTerm.trim().toLowerCase()

    return apiKeys.filter((apiKey) => {
      const searchMatches = !query || [apiKey.name, apiKey.environment, apiKey.permissions.join(' '), apiKey.status]
        .join(' ')
        .toLowerCase()
        .includes(query)

      const statusMatches = apiStatusFilter === 'All' || apiKey.status === apiStatusFilter
      return searchMatches && statusMatches
    })
  }, [apiKeys, apiKeySearchTerm, apiStatusFilter])

  const toggleApiKeyPermission = (permission) => {
    setApiKeyForm((previous) => {
      const nextPermissions = previous.permissions.includes(permission)
        ? previous.permissions.filter((item) => item !== permission)
        : [...previous.permissions, permission]

      return {
        ...previous,
        permissions: nextPermissions,
      }
    })

    setApiKeyFormErrors((previous) => ({ ...previous, permissions: '' }))
  }

  const handleApiKeyFieldChange = (field, value) => {
    setApiKeyForm((previous) => ({ ...previous, [field]: value }))
    setApiKeyFormErrors((previous) => ({ ...previous, [field]: '' }))
  }

  const validateApiKeyForm = () => {
    const errors = {}

    if (!apiKeyForm.name.trim()) {
      errors.name = 'API key name is required.'
    }

    if (!apiKeyForm.environment) {
      errors.environment = 'Environment is required.'
    }

    if (!apiKeyForm.permissions.length) {
      errors.permissions = 'Select at least one permission.'
    }

    if (!apiKeyForm.expiry) {
      errors.expiry = 'Expiry is required.'
    }

    return errors
  }

  const handleCreateApiKey = () => {
    const errors = validateApiKeyForm()
    if (Object.keys(errors).length > 0) {
      setApiKeyFormErrors(errors)
      return
    }

    const randomBytes = new Uint8Array(24)
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(randomBytes)
    } else if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      crypto.getRandomValues(randomBytes)
    } else {
      throw new Error('Secure random number generation is not available in this browser.')
    }

    const randomHex = Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
    const completeKey = `ch_test_${randomHex}`
    const createdAt = new Date().toISOString().slice(0, 10)
    const expiresAt = apiKeyForm.expiry === 'Never'
      ? 'Never'
      : new Date(Date.now() + (apiKeyForm.expiry === '30 days' ? 30 : 90) * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

    const nextRecord = {
      id: Date.now(),
      name: apiKeyForm.name.trim(),
      keyPrefix: 'ch_test_',
      lastFour: completeKey.slice(-4),
      environment: apiKeyForm.environment,
      permissions: [...apiKeyForm.permissions],
      createdAt,
      expiresAt,
      status: 'Active',
      lastUsedAt: new Date().toISOString(),
    }

    setApiKeys((previous) => [nextRecord, ...previous])
    setNewlyCreatedApiKey({ completeKey, copied: false })
  }

  const closeApiKeyModal = () => {
    setIsApiKeyModalOpen(false)
    setApiKeyForm(defaultApiKeyFormState)
    setApiKeyFormErrors({})
    setNewlyCreatedApiKey(null)
  }

  const revokeApiKey = (apiKey) => {
    if (apiKey.status === 'Revoked') return

    const confirmed = window.confirm(`Revoke API key "${apiKey.name}"? This action cannot be undone.`)
    if (!confirmed) return

    setApiKeys((previous) => previous.map((item) => {
      if (item.id !== apiKey.id) return item
      return {
        ...item,
        status: 'Revoked',
        lastUsedAt: item.lastUsedAt || new Date().toISOString(),
      }
    }))
  }

  const copyGeneratedApiKey = async () => {
    if (!newlyCreatedApiKey) return

    try {
      await navigator.clipboard.writeText(newlyCreatedApiKey.completeKey)
      setNewlyCreatedApiKey((previous) => ({ ...previous, copied: true }))
    } catch {
      setNewlyCreatedApiKey((previous) => ({ ...previous, copied: false }))
    }
  }

  const renderApiManagement = () => (
    <section className="api-page">
      <div className="page-header api-header">
        <div>
          <p className="eyebrow">Security</p>
          <h1>API Management</h1>
        </div>
        <div className="api-actions">
          <span className="demo-mode-indicator">Demo mode</span>
          <button type="button" className="primary-button" onClick={() => {
            setApiKeyForm(defaultApiKeyFormState)
            setApiKeyFormErrors({})
            setNewlyCreatedApiKey(null)
            setIsApiKeyModalOpen(true)
          }}>
            + Create API Key
          </button>
        </div>
      </div>

      <section className="stats-grid api-summary-grid" aria-label="API key summary">
        <article className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Total keys</span>
          </div>
          <strong className="stat-value">{apiKeySummary.total}</strong>
        </article>

        <article className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Active</span>
          </div>
          <strong className="stat-value">{apiKeySummary.active}</strong>
        </article>

        <article className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Revoked</span>
          </div>
          <strong className="stat-value">{apiKeySummary.revoked}</strong>
        </article>
      </section>

      <div className="customers-toolbar lead-toolbar api-toolbar">
        <label className="toolbar-search">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Search API keys by name or permissions"
            value={apiKeySearchTerm}
            onChange={(event) => setApiKeySearchTerm(event.target.value)}
          />
        </label>

        <label className="toolbar-filter">
          <span>Status</span>
          <select value={apiStatusFilter} onChange={(event) => setApiStatusFilter(event.target.value)}>
            {['All', 'Active', 'Revoked'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="table-wrap api-table-wrap">
        <table className="customers-table api-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Masked API Key</th>
              <th>Environment</th>
              <th>Permissions</th>
              <th>Created</th>
              <th>Expiry</th>
              <th>Last used</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApiKeys.length === 0 ? (
              <tr>
                <td colSpan="9" className="empty-state">No API keys match the current search or status filter.</td>
              </tr>
            ) : (
              filteredApiKeys.map((apiKey) => (
                <tr key={apiKey.id}>
                  <td>{apiKey.name}</td>
                  <td className="api-key-cell">{buildMaskedApiKey(apiKey.keyPrefix, apiKey.lastFour)}</td>
                  <td>{apiKey.environment}</td>
                  <td>{apiKey.permissions.join(', ') || 'No permissions assigned'}</td>
                  <td>{formatDate(apiKey.createdAt)}</td>
                  <td>{apiKey.expiresAt === 'Never' ? 'Never' : formatDate(apiKey.expiresAt)}</td>
                  <td>{apiKey.lastUsedAt ? formatDate(apiKey.lastUsedAt) : 'Never used'}</td>
                  <td>
                    <span className={`status-pill ${apiKey.status.toLowerCase()}`}>{apiKey.status}</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="row-button delete"
                      onClick={() => revokeApiKey(apiKey)}
                      disabled={apiKey.status === 'Revoked'}
                    >
                      {apiKey.status === 'Revoked' ? 'Revoked' : 'Revoke'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )

  const usageKeyOptions = useMemo(() => {
    const keys = demoUsageRecords.map((record) => record.apiKeyName)
    return ['All', ...new Set(keys)]
  }, [])

  const usageSummary = useMemo(() => {
    const total = demoUsageRecords.length
    const successful = demoUsageRecords.filter((record) => record.result === 'Success').length
    const failed = demoUsageRecords.filter((record) => record.result === 'Failed').length
    const averageResponseTime = Math.round(
      demoUsageRecords.reduce((sum, record) => sum + record.responseTime, 0) / total
    )

    return {
      total,
      successful,
      failed,
      averageResponseTime,
    }
  }, [])

  const filteredUsageRecords = useMemo(() => {
    const query = usageSearchTerm.trim().toLowerCase()

    return demoUsageRecords.filter((record) => {
      const matchesSearch = !query || [record.apiKeyName, record.endpoint, record.method, record.result, record.statusCode]
        .join(' ')
        .toLowerCase()
        .includes(query)

      const matchesDate = (() => {
        if (usageDateFilter === 'All') return true

        const recordDate = new Date(record.dateTime)
        const today = new Date()
        const daysAgo = new Date(today)
        daysAgo.setDate(today.getDate() - 7)

        if (usageDateFilter === 'Last 7 days') {
          return recordDate >= daysAgo && recordDate <= today
        }

        if (usageDateFilter === 'Last 30 days') {
          const thirtyDaysAgo = new Date(today)
          thirtyDaysAgo.setDate(today.getDate() - 30)
          return recordDate >= thirtyDaysAgo && recordDate <= today
        }

        if (usageDateFilter === 'Today') {
          return recordDate.toDateString() === today.toDateString()
        }

        return true
      })()

      const matchesKey = usageKeyFilter === 'All' || record.apiKeyName === usageKeyFilter
      const matchesStatus = usageStatusFilter === 'All' || record.result === usageStatusFilter

      return matchesSearch && matchesDate && matchesKey && matchesStatus
    })
  }, [usageDateFilter, usageKeyFilter, usageSearchTerm, usageStatusFilter])

  const dailyUsageChart = useMemo(() => {
    const entries = []
    const dayMap = new Map()

    demoUsageRecords.forEach((record) => {
      const day = new Date(record.dateTime).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })

      dayMap.set(day, (dayMap.get(day) || 0) + 1)
    })

    for (const [label, total] of [...dayMap.entries()].slice(-7)) {
      entries.push({ label, total })
    }

    return entries
  }, [])

  const endpointUsageChart = useMemo(() => {
    const endpointMap = new Map()

    demoUsageRecords.forEach((record) => {
      endpointMap.set(record.endpoint, (endpointMap.get(record.endpoint) || 0) + 1)
    })

    return [...endpointMap.entries()].map(([endpoint, total]) => ({ endpoint, total }))
  }, [])

  const requestBreakdownChart = useMemo(() => {
    const success = demoUsageRecords.filter((record) => record.result === 'Success').length
    const failed = demoUsageRecords.filter((record) => record.result === 'Failed').length
    return [
      { label: 'Successful', value: success, color: '#22c55e' },
      { label: 'Failed', value: failed, color: '#ef4444' },
    ]
  }, [])

  const renderUsageTracking = () => (
    <section className="usage-page">
      <div className="page-header usage-header">
        <div>
          <p className="eyebrow">Monitoring</p>
          <h1>Usage Tracking</h1>
        </div>
        <span className="demo-badge">DEMO DATA</span>
      </div>

      <section className="stats-grid usage-summary-grid" aria-label="Usage summary cards">
        <article className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Total API Requests</span>
          </div>
          <strong className="stat-value">{usageSummary.total}</strong>
        </article>

        <article className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Successful Requests</span>
          </div>
          <strong className="stat-value">{usageSummary.successful}</strong>
        </article>

        <article className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Failed Requests</span>
          </div>
          <strong className="stat-value">{usageSummary.failed}</strong>
        </article>

        <article className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Average Response Time</span>
          </div>
          <strong className="stat-value">{usageSummary.averageResponseTime} ms</strong>
        </article>
      </section>

      <section className="usage-charts-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Trend</p>
              <h2>API requests over time</h2>
            </div>
          </div>

          <div className="chart-bars grouped-bars" aria-label="Daily API requests chart">
            {dailyUsageChart.map((point) => (
              <div key={point.label} className="chart-bar-group">
                <div className="chart-bar-stack">
                  <span className="chart-bar" style={{ height: `${Math.max(18, (point.total / Math.max(...dailyUsageChart.map((item) => item.total), 1)) * 100)}%` }} />
                </div>
                <small>{point.label}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Outcome</p>
              <h2>Successful vs failed requests</h2>
            </div>
          </div>

          <div className="stacked-chart" aria-label="Request success and failure comparison">
            {requestBreakdownChart.map((item) => (
              <div key={item.label} className="stacked-row">
                <div className="stacked-label-row">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
                <div className="stacked-track">
                  <span
                    className="stacked-fill"
                    style={{
                      width: `${(item.value / Math.max(usageSummary.total, 1)) * 100}%`,
                      background: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel usage-endpoint-panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Endpoint health</p>
              <h2>Usage by API endpoint</h2>
            </div>
          </div>

          <div className="endpoint-list" aria-label="Usage by API endpoint">
            {endpointUsageChart.map(({ endpoint, total }) => (
              <div key={endpoint} className="endpoint-row">
                <div className="endpoint-header-row">
                  <span>{endpoint}</span>
                  <strong>{total}</strong>
                </div>
                <div className="endpoint-track">
                  <span
                    className="endpoint-fill"
                    style={{ width: `${(total / Math.max(...endpointUsageChart.map((item) => item.total), 1)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="usage-table-panel panel">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Activity</p>
            <h2>Recent API usage</h2>
          </div>
        </div>

        <div className="customers-toolbar lead-toolbar usage-filters">
          <label className="toolbar-search">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Search endpoint, key, method, or result"
              value={usageSearchTerm}
              onChange={(event) => setUsageSearchTerm(event.target.value)}
            />
          </label>

          <label className="toolbar-filter">
            <span>Date</span>
            <select value={usageDateFilter} onChange={(event) => setUsageDateFilter(event.target.value)}>
              {['All', 'Today', 'Last 7 days', 'Last 30 days'].map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="toolbar-filter">
            <span>API key</span>
            <select value={usageKeyFilter} onChange={(event) => setUsageKeyFilter(event.target.value)}>
              {usageKeyOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="toolbar-filter">
            <span>Status</span>
            <select value={usageStatusFilter} onChange={(event) => setUsageStatusFilter(event.target.value)}>
              {['All', 'Success', 'Failed'].map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="table-wrap usage-table-wrap">
          <table className="customers-table usage-table">
            <thead>
              <tr>
                <th>Date & time</th>
                <th>API key</th>
                <th>Endpoint</th>
                <th>Method</th>
                <th>Status code</th>
                <th>Response time</th>
                <th>Request result</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsageRecords.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-state">No usage records match the current search and filters.</td>
                </tr>
              ) : (
                filteredUsageRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{new Date(record.dateTime).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}</td>
                    <td>{record.apiKeyName}</td>
                    <td>{record.endpoint}</td>
                    <td>{record.method}</td>
                    <td>{record.statusCode}</td>
                    <td>{record.responseTime} ms</td>
                    <td>
                      <span className={`status-pill ${record.result === 'Success' ? 'active' : 'revoked'}`}>
                        {record.result}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  )

  const handleSettingsFieldChange = (field, value) => {
    setSettingsDraft((previous) => ({
      ...previous,
      [field]: value,
    }))
    setSettingsMessage('')
  }

  const handleSaveSettings = () => {
    setSavedSettings(settingsDraft)
    setSettingsMessage('Settings saved successfully. Frontend demo settings are stored locally and not connected to a backend.')
  }

  const handleResetSettings = () => {
    setSettingsDraft(savedSettings)
    setSettingsMessage('Changes discarded. The saved demo settings remain in place.')
  }

  const renderSettings = () => (
    <section className="settings-page">
      <div className="page-header settings-header">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1>Settings</h1>
        </div>
        <div className="settings-demo-badge">Frontend demo</div>
      </div>

      <div className="settings-banner">
        These settings are demo-only frontend preferences and are not connected to Google Sheets or Google Apps Script yet.
      </div>

      {settingsMessage && <div className="settings-success-message">{settingsMessage}</div>}

      <div className="settings-grid">
        <section className="settings-section panel">
          <div className="section-header-row">
            <div>
              <p className="panel-kicker">Business</p>
              <h2>Company Profile</h2>
            </div>
          </div>

          <div className="form-grid settings-form-grid">
            <label className="field">
              <span>Company name</span>
              <input
                type="text"
                value={settingsDraft.companyName}
                onChange={(event) => handleSettingsFieldChange('companyName', event.target.value)}
              />
            </label>

            <label className="field">
              <span>Business email</span>
              <input
                type="email"
                value={settingsDraft.businessEmail}
                onChange={(event) => handleSettingsFieldChange('businessEmail', event.target.value)}
              />
            </label>

            <label className="field">
              <span>Contact number</span>
              <input
                type="tel"
                value={settingsDraft.contactNumber}
                onChange={(event) => handleSettingsFieldChange('contactNumber', event.target.value)}
              />
            </label>

            <label className="field">
              <span>Website</span>
              <input
                type="url"
                value={settingsDraft.website}
                onChange={(event) => handleSettingsFieldChange('website', event.target.value)}
              />
            </label>
          </div>
        </section>

        <section className="settings-section panel">
          <div className="section-header-row">
            <div>
              <p className="panel-kicker">Profile</p>
              <h2>User Profile</h2>
            </div>
          </div>

          <div className="form-grid settings-form-grid">
            <label className="field">
              <span>User name</span>
              <input
                type="text"
                value={settingsDraft.userName}
                onChange={(event) => handleSettingsFieldChange('userName', event.target.value)}
              />
            </label>

            <label className="field">
              <span>Email address</span>
              <input
                type="email"
                value={settingsDraft.userEmail}
                onChange={(event) => handleSettingsFieldChange('userEmail', event.target.value)}
              />
            </label>

            <label className="field full-span">
              <span>Role</span>
              <input
                type="text"
                value={settingsDraft.userRole}
                onChange={(event) => handleSettingsFieldChange('userRole', event.target.value)}
              />
            </label>
          </div>
        </section>

        <section className="settings-section panel">
          <div className="section-header-row">
            <div>
              <p className="panel-kicker">Preferences</p>
              <h2>General Preferences</h2>
            </div>
          </div>

          <div className="form-grid settings-form-grid">
            <label className="field">
              <span>Timezone</span>
              <select value={settingsDraft.timezone} onChange={(event) => handleSettingsFieldChange('timezone', event.target.value)}>
                <option value="UTC-08:00 (Pacific Time)">UTC-08:00 (Pacific Time)</option>
                <option value="UTC-05:00 (Eastern Time)">UTC-05:00 (Eastern Time)</option>
                <option value="UTC+00:00 (GMT)">UTC+00:00 (GMT)</option>
                <option value="UTC+01:00 (Central European Time)">UTC+01:00 (Central European Time)</option>
              </select>
            </label>

            <label className="field">
              <span>Date format</span>
              <select value={settingsDraft.dateFormat} onChange={(event) => handleSettingsFieldChange('dateFormat', event.target.value)}>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </label>

            <label className="field full-span">
              <span>Time format</span>
              <select value={settingsDraft.timeFormat} onChange={(event) => handleSettingsFieldChange('timeFormat', event.target.value)}>
                <option value="12-hour">12-hour</option>
                <option value="24-hour">24-hour</option>
              </select>
            </label>
          </div>
        </section>

        <section className="settings-section panel">
          <div className="section-header-row">
            <div>
              <p className="panel-kicker">API</p>
              <h2>API Configuration</h2>
            </div>
          </div>

          <div className="form-grid settings-form-grid">
            <label className="field full-span">
              <span>API base URL</span>
              <input
                type="url"
                value={settingsDraft.apiBaseUrl}
                onChange={(event) => handleSettingsFieldChange('apiBaseUrl', event.target.value)}
              />
            </label>

            <label className="field">
              <span>Environment</span>
              <select value={settingsDraft.environment} onChange={(event) => handleSettingsFieldChange('environment', event.target.value)}>
                <option value="Development">Development</option>
                <option value="Production">Production</option>
              </select>
            </label>

            <label className="field">
              <span>Configuration status</span>
              <select value={settingsDraft.configurationStatus} onChange={(event) => handleSettingsFieldChange('configurationStatus', event.target.value)}>
                <option value="Demo mode - not connected">Demo mode - not connected</option>
                <option value="Ready for API integration">Ready for API integration</option>
                <option value="Connected">Connected</option>
              </select>
            </label>
          </div>
        </section>
      </div>

      <div className="settings-actions">
        <button type="button" className="ghost-button" onClick={handleResetSettings}>Reset Changes</button>
        <button type="button" className="primary-button" onClick={handleSaveSettings}>Save Changes</button>
      </div>
    </section>
  )

  const renderActivities = () => (
    <section className="activities-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Operations</p>
          <h1>Activity Management</h1>
        </div>
        <button type="button" className="primary-button" onClick={openAddActivity}>
          + Add activity
        </button>
      </div>

      <section className="stats-grid" aria-label="Activity overview">
        {activityOverview.map((metric) => (
          <article key={metric.label} className="stat-card activity-stat-card">
            <div className="stat-header">
              <span className="stat-label">{metric.label}</span>
            </div>
            <strong className="stat-value">{metric.value}</strong>
          </article>
        ))}
      </section>

      <div className="customers-toolbar lead-toolbar activity-toolbar">
        <label className="toolbar-search">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Search activity, owner, account, or subject"
            value={activitySearchTerm}
            onChange={(event) => setActivitySearchTerm(event.target.value)}
          />
        </label>

        <label className="toolbar-filter">
          <span>Type</span>
          <select value={activityTypeFilter} onChange={(event) => setActivityTypeFilter(event.target.value)}>
            {['All', ...activityTypes].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="toolbar-filter">
          <span>Status</span>
          <select value={activityStatusFilter} onChange={(event) => setActivityStatusFilter(event.target.value)}>
            {activityStatusOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="toolbar-filter">
          <span>Priority</span>
          <select value={activityPriorityFilter} onChange={(event) => setActivityPriorityFilter(event.target.value)}>
            {['All', ...activityPriorityOptions].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="toolbar-filter">
          <span>Date</span>
          <select value={activityDateFilter} onChange={(event) => setActivityDateFilter(event.target.value)}>
            {['All', 'Today', 'This week', 'This month', 'Overdue'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="table-wrap">
        <table className="customers-table activities-table">
          <thead>
            <tr>
              <th>
                <button type="button" className="sort-button" onClick={() => handleActivitySort('activityId')}>
                  Activity ID{getActivitySortIndicator('activityId')}
                </button>
              </th>
              <th>
                <button type="button" className="sort-button" onClick={() => handleActivitySort('subject')}>
                  Subject{getActivitySortIndicator('subject')}
                </button>
              </th>
              <th>Type</th>
              <th>Customer</th>
              <th>Lead</th>
              <th>Owner</th>
              <th>
                <button type="button" className="sort-button" onClick={() => handleActivitySort('priority')}>
                  Priority{getActivitySortIndicator('priority')}
                </button>
              </th>
              <th>
                <button type="button" className="sort-button" onClick={() => handleActivitySort('dueDate')}>
                  Due Date{getActivitySortIndicator('dueDate')}
                </button>
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedActivities.length === 0 ? (
              <tr>
                <td colSpan="10" className="empty-state">No activities match the current filters.</td>
              </tr>
            ) : (
              paginatedActivities.map((activity) => {
                const status = getActivityStatus(activity)
                return (
                  <tr key={activity.id}>
                    <td>{activity.activityId}</td>
                    <td>{activity.subject}</td>
                    <td>{activity.type}</td>
                    <td>{resolveCustomerName(activity.relatedCustomerId, customers)}</td>
                    <td>{resolveLeadName(activity.relatedLeadId, leads)}</td>
                    <td>{activity.assignedTo}</td>
                    <td>
                      <span className={`priority-pill ${getPriorityClass(activity.priority)}`}>{activity.priority}</span>
                    </td>
                    <td>{formatDate(activity.dueDate)}</td>
                    <td>
                      <span className={`status-pill ${status.toLowerCase()}`}>{status}</span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button type="button" className="row-button view" onClick={() => { setSelectedActivity(activity); setActivityDetailsOpen(true) }}>View</button>
                        <button type="button" className="row-button edit" onClick={() => openEditActivity(activity)}>Edit</button>
                        {status !== 'Completed' && (
                          <button type="button" className="row-button view" onClick={() => completeActivity(activity.id)}>Complete</button>
                        )}
                        <button type="button" className="row-button" onClick={() => rescheduleActivity(activity.id)}>Reschedule</button>
                        <button type="button" className="row-button delete" onClick={() => deleteActivity(activity.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {sortedActivities.length > activityPageSize && (
        <div className="pagination" aria-label="Activity pagination">
          <button type="button" className="ghost-button" disabled={activityCurrentPage === 1} onClick={() => setActivityCurrentPage((previous) => Math.max(1, previous - 1))}>Previous</button>
          <span>Page {activityCurrentPage} of {totalActivityPages}</span>
          <button type="button" className="ghost-button" disabled={activityCurrentPage === totalActivityPages} onClick={() => setActivityCurrentPage((previous) => Math.min(totalActivityPages, previous + 1))}>Next</button>
        </div>
      )}

      <div className="panel-grid activity-panel-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Timeline</p>
              <h2>Recent activity feed</h2>
            </div>
          </div>

          <ul className="activity-list compact-list">
            {activities
              .slice()
              .sort((left, right) => new Date(right.activityDate || right.dueDate) - new Date(left.activityDate || left.dueDate))
              .slice(0, 6)
              .map((activity) => (
                <li key={activity.id} className="activity-item timeline-item">
                  <div className="activity-bullet" aria-hidden="true" />
                  <div className="activity-copy">
                    <p>{activity.subject}</p>
                    <span>{activity.assignedTo} · {activity.type} · {formatDate(activity.activityDate)}</span>
                  </div>
                  <span className={`status-pill ${getActivityStatus(activity).toLowerCase()}`}>{getActivityStatus(activity)}</span>
                </li>
              ))}
          </ul>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Context</p>
              <h2>Entity timeline</h2>
            </div>
          </div>

          <div className="timeline-controls">
            <label className="toolbar-filter timeline-select">
              <span>Scope</span>
              <select value={timelineScope} onChange={(event) => setTimelineScope(event.target.value)}>
                {['Customer', 'Lead'].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>

            <label className="toolbar-filter timeline-select">
              <span>{timelineScope}</span>
              <select value={timelineTargetId} onChange={(event) => setTimelineTargetId(event.target.value)}>
                {timelineEntities.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </label>
          </div>

          <ul className="activity-list compact-list">
            {timelineActivities.length === 0 ? (
              <li className="empty-state">No activity history for this {timelineScope.toLowerCase()}.</li>
            ) : (
              timelineActivities.map((activity) => (
                <li key={activity.id} className="activity-item timeline-item">
                  <div className="activity-bullet" aria-hidden="true" />
                  <div className="activity-copy">
                    <p>{activity.subject}</p>
                    <span>{activity.type} · {formatDate(activity.activityDate)} · {activity.assignedTo}</span>
                  </div>
                  <span className={`status-pill ${getActivityStatus(activity).toLowerCase()}`}>{getActivityStatus(activity)}</span>
                </li>
              ))
            )}
          </ul>
        </article>
      </div>

      {activityFormOpen && (
        <ActivityFormModal
          formData={activityFormData}
          errors={activityFormErrors}
          mode={activityFormMode}
          onChange={handleActivityFieldChange}
          onClose={closeActivityForm}
          onSubmit={submitActivity}
          customers={customers}
          leads={leads}
        />
      )}

      {activityDetailsOpen && (
        <ActivityDetailsModal
          activity={selectedActivity}
          customers={customers}
          leads={leads}
          onClose={() => setActivityDetailsOpen(false)}
        />
      )}
    </section>
  )

  return (
    <div className="app-shell">
      <SidebarNav items={navItems} activeTab={activeTab} onSelect={setActiveTab} />

      <main className="main-panel">
        <header className="topbar">
          <div className="topbar-title">
            <div className="mobile-brand">CH</div>
            <span>ClientHub</span>
          </div>

          <label className="search-box" aria-label="Search">
            <span>⌕</span>
            <input type="search" placeholder="Search customers, leads, APIs" />
          </label>

          <div className="topbar-actions">
            <button type="button" className="icon-button" aria-label="Notifications">
              🔔
              <span className="notification-badge">3</span>
            </button>
            <div className="profile-pill">
              <div className="avatar">MP</div>
              <div>
                <strong>Maya Patel</strong>
                <span>Operations Lead</span>
              </div>
            </div>
          </div>
        </header>

        {activeTab === 'Customers'
          ? renderCustomers()
          : activeTab === 'Leads'
            ? renderLeads()
            : activeTab === 'Activities'
              ? renderActivities()
              : activeTab === 'API Management'
                ? renderApiManagement()
                : activeTab === 'Usage Tracking' || activeTab === 'Usage'
                  ? renderUsageTracking()
                  : activeTab === 'Settings'
                    ? renderSettings()
                    : renderDashboard()}
      </main>

      {isApiKeyModalOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-card api-key-modal">
            <div className="modal-header">
              <div>
                <p className="panel-kicker">Security</p>
                <h3>{newlyCreatedApiKey ? 'API key created' : 'Create API key'}</h3>
              </div>
              <button type="button" className="close-button" onClick={closeApiKeyModal} aria-label="Close API key form">
                ×
              </button>
            </div>

            {newlyCreatedApiKey ? (
              <div className="api-key-success">
                <div className="generated-key-box">
                  <span className="panel-kicker">API key</span>
                  <code>{newlyCreatedApiKey.completeKey}</code>
                </div>

                <div className="warning-box">
                  Save this API key securely. It will not be visible again once this dialog is closed.
                </div>

                <div className="modal-actions">
                  <button type="button" className="ghost-button" onClick={closeApiKeyModal}>Close</button>
                  <button type="button" className="primary-button" onClick={copyGeneratedApiKey}>
                    {newlyCreatedApiKey.copied ? 'Copied' : 'Copy API Key'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="form-grid api-key-form-grid">
                  <label className="field">
                    <span>API key name</span>
                    <input
                      type="text"
                      value={apiKeyForm.name}
                      onChange={(event) => handleApiKeyFieldChange('name', event.target.value)}
                    />
                    {apiKeyFormErrors.name && <small>{apiKeyFormErrors.name}</small>}
                  </label>

                  <label className="field">
                    <span>Environment</span>
                    <select value={apiKeyForm.environment} onChange={(event) => handleApiKeyFieldChange('environment', event.target.value)}>
                      <option value="Test">Test</option>
                    </select>
                    {apiKeyFormErrors.environment && <small>{apiKeyFormErrors.environment}</small>}
                  </label>

                  <div className="field full-span">
                    <span>Permissions</span>
                    <div className="api-key-permissions">
                      {['Customers', 'Leads', 'Activities'].map((resource) => (
                        <div key={resource} className="permission-group">
                          <strong>{resource}</strong>
                          <div className="permission-options">
                            {['Read', 'Write'].map((access) => {
                              const permissionLabel = `${resource}: ${access}`
                              const checked = apiKeyForm.permissions.includes(permissionLabel)

                              return (
                                <label key={permissionLabel} className="checkbox-option">
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleApiKeyPermission(permissionLabel)}
                                  />
                                  <span>{access}</span>
                                </label>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                    {apiKeyFormErrors.permissions && <small>{apiKeyFormErrors.permissions}</small>}
                  </div>

                  <label className="field full-span">
                    <span>Expiry</span>
                    <select value={apiKeyForm.expiry} onChange={(event) => handleApiKeyFieldChange('expiry', event.target.value)}>
                      {apiKeyExpiryOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {apiKeyFormErrors.expiry && <small>{apiKeyFormErrors.expiry}</small>}
                  </label>
                </div>

                <div className="modal-actions">
                  <button type="button" className="ghost-button" onClick={closeApiKeyModal}>Cancel</button>
                  <button type="button" className="primary-button" onClick={handleCreateApiKey}>Create API Key</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isFormOpen && (
        <CustomerFormModal
          formData={formData}
          errors={formErrors}
          mode={formMode}
          onChange={handleFieldChange}
          onClose={closeCustomerForm}
          onSubmit={submitCustomer}
        />
      )}

      {isDetailsOpen && (
        <CustomerDetailsModal customer={selectedCustomer} onClose={() => setIsDetailsOpen(false)} />
      )}
    </div>
  )
}

export default App
