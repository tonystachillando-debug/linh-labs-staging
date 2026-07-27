\# Zoho Books API — Data Schemas for KAI Connector



\*\*Blueprint:\*\* AmaZix Crypto Payment Processor  

\*\*Owner:\*\* @Canaricolor  

\*\*Status:\*\* DRAFT  

\*\*Last updated:\*\* 2026-03-25  

\*\*Source:\*\* Zoho Books API v3 — https://www.zoho.com/books/api/v3/  



\---



\## Important: API Base URL



AmaZix is EU-based (Italy). Zoho Books uses \*\*region-specific domains\*\*.



\- \*\*EU base URL:\*\* `https://www.zohoapis.eu/books/v3/`

\- NOT `zohoapis.com` (that's US)

\- API rate limit: 100 requests/minute, daily limit depends on plan



\*\*Authentication:\*\* OAuth 2.0. Requires client\_id, client\_secret, refresh token.  

\*\*OAuth scopes needed:\*\* `ZohoBooks.contacts.CREATE`, `ZohoBooks.contacts.READ`, `ZohoBooks.invoices.CREATE`, `ZohoBooks.customerpayments.CREATE`



\*\*All requests require:\*\* `?organization\_id={org\_id}` as query parameter.



\---



\## Dataset 1: Customer (Contact)



\*\*Trigger:\*\* Customer registers on KAI e-commerce  

\*\*Endpoint:\*\* `POST https://www.zohoapis.eu/books/v3/contacts?organization\_id={org\_id}`  

\*\*OAuth Scope:\*\* `ZohoBooks.contacts.CREATE`



\### KAI Registration Form → Zoho Fields Mapping



| KAI Form Field | Zoho API Field | Type | Required | Max Length | Notes |

|----------------|---------------|------|----------|------------|-------|

| Full name / Display name | `contact\_name` | string | \*\*YES\*\* | 200 | Main identifier. Used for search and display. |

| Company name | `company\_name` | string | No | 200 | Optional for individual customers |

| — | `contact\_type` | string | \*\*YES\*\* | — | Always `"customer"` |

| — | `customer\_sub\_type` | string | No | — | `"individual"` or `"business"` |

| Email | `contact\_persons\[0].email` | string | Recommended | 100 | Inside contact\_persons array |

| First name | `contact\_persons\[0].first\_name` | string | Recommended | 100 | |

| Last name | `contact\_persons\[0].last\_name` | string | Recommended | 100 | |

| Phone | `contact\_persons\[0].phone` | string | No | 50 | |

| Mobile | `contact\_persons\[0].mobile` | string | No | 50 | |

| — | `contact\_persons\[0].is\_primary\_contact` | boolean | — | — | Always `true` |

| Street address | `billing\_address.address` | string | Recommended | 500 | |

| Street line 2 | `billing\_address.street2` | string | No | 255 | |

| City | `billing\_address.city` | string | Recommended | 100 | |

| State/Province | `billing\_address.state` | string | No | 100 | |

| ZIP/Postal code | `billing\_address.zip` | string | Recommended | 50 | |

| Country | `billing\_address.country` | string | Recommended | 100 | |

| — | `currency\_code` | string | — | — | Set to `"EUR"` (AmaZix base currency) |

| — | `language\_code` | string | — | — | `"en"` or `"it"` based on KAI language |

| — | `payment\_terms` | integer | — | — | `0` (immediate — crypto payments are instant) |

| — | `payment\_terms\_label` | string | — | — | `"Due on Receipt"` |

| VAT number (if business) | `custom\_fields\[0].value` | string | No | — | EU VAT ID. Use custom field or native `vat\_reg\_no` if EU edition. |

| Fiscal code (Italy) | `custom\_fields\[1].value` | string | No | — | Codice Fiscale. Map to custom field. |

| KAI internal user ID | `contact\_number` | string | No | 200 | Store KAI's user ID for cross-referencing |



\### Example JSON Payload



```json

{

&#x20; "contact\_name": "Mario Rossi",

&#x20; "company\_name": "",

&#x20; "contact\_type": "customer",

&#x20; "customer\_sub\_type": "individual",

&#x20; "currency\_code": "EUR",

&#x20; "language\_code": "it",

&#x20; "payment\_terms": 0,

&#x20; "payment\_terms\_label": "Due on Receipt",

&#x20; "contact\_number": "KAI-USR-00042",

&#x20; "billing\_address": {

&#x20;   "address": "Via Roma 123",

&#x20;   "street2": "",

&#x20;   "city": "Torino",

&#x20;   "state": "Piemonte",

&#x20;   "zip": "10100",

&#x20;   "country": "Italy"

&#x20; },

&#x20; "contact\_persons": \[

&#x20;   {

&#x20;     "first\_name": "Mario",

&#x20;     "last\_name": "Rossi",

&#x20;     "email": "mario.rossi@example.com",

&#x20;     "phone": "+39 011 1234567",

&#x20;     "is\_primary\_contact": true

&#x20;   }

&#x20; ],

&#x20; "custom\_fields": \[

&#x20;   {

&#x20;     "label": "Codice Fiscale",

&#x20;     "value": "RSSMRA80A01L219K"

&#x20;   }

&#x20; ]

}

```



\### Response: Key Fields to Store



The response returns a `contact\_id` — \*\*store this in KAI's database\*\*. It's required to create invoices and payments linked to this customer.



```json

{

&#x20; "code": 0,

&#x20; "message": "The contact has been created.",

&#x20; "contact": {

&#x20;   "contact\_id": "460000000026049",

&#x20;   "contact\_name": "Mario Rossi",

&#x20;   ...

&#x20; }

}

```



\### Deduplication Logic



Before creating a new contact, search for existing:  

`GET /contacts?email={email}\&organization\_id={org\_id}`  

If found, use existing `contact\_id`. Don't create duplicates.



\---



\## Dataset 2: Invoice



\*\*Trigger:\*\* Crypto payment confirmed on-chain (webhook from BTCPay or PayRam)  

\*\*Endpoint:\*\* `POST https://www.zohoapis.eu/books/v3/invoices?organization\_id={org\_id}`  

\*\*OAuth Scope:\*\* `ZohoBooks.invoices.CREATE`



\### Webhook Payload → Zoho Invoice Mapping



| Source | Zoho API Field | Type | Required | Notes |

|--------|---------------|------|----------|-------|

| Stored `contact\_id` from Dataset 1 | `customer\_id` | string | \*\*YES\*\* | Links invoice to customer |

| Auto-generated (`BTC-` or `ETH-` prefix) | `invoice\_number` | string | \*\*YES\*\* | e.g. `"BTC-0001"`, `"ETH-0001"` |

| Payment confirmation timestamp | `date` | string | \*\*YES\*\* | Format: `YYYY-MM-DD` |

| Same as `date` | `due\_date` | string | No | Same day (instant payment) |

| Order items from KAI | `line\_items` | array | \*\*YES\*\* | See sub-fields below |

| — | `line\_items\[].name` | string | \*\*YES\*\* | Product/service description |

| — | `line\_items\[].quantity` | integer | \*\*YES\*\* | |

| — | `line\_items\[].rate` | double | \*\*YES\*\* | Unit price in EUR |

| — | `line\_items\[].tax\_id` | string | No | Italian VAT tax ID if applicable |

| `"EUR"` | `currency\_code` | string | No | AmaZix base currency |

| — | `is\_inclusive\_tax` | boolean | No | `true` if prices include VAT |

| — | `payment\_terms` | integer | No | `0` |

| — | `payment\_terms\_label` | string | No | `"Due on Receipt"` |

| Crypto metadata summary | `notes` | string | No | Human-readable payment details |

| Crypto details | `custom\_fields` | array | No | Structured crypto data (see below) |



\### Custom Fields for Crypto Metadata



These must be \*\*pre-configured in Zoho Books\*\* by Dennis before the connector can use them.



| Custom Field Label | Example Value | Source |

|-------------------|---------------|--------|

| `Cryptocurrency` | `ETH`, `BTC`, `USDC` | Webhook `currency` field |

| `Crypto Amount` | `0.0042 ETH` | Webhook `crypto\_amount` + currency |

| `Exchange Rate` | `1 ETH = €2,380.95` | Webhook `exchange\_rate` |

| `TX Hash` | `0xabc123def456...` | Webhook `tx\_id` / `transaction\_hash` |

| `Blockchain` | `Ethereum`, `Bitcoin` | Derived from payment processor |

| `Payment Processor` | `BTCPay Server` or `PayRam` | Connector logic |

| `Block Confirmations` | `12` | Webhook `confirmations` |



\### Example JSON Payload



```json

{

&#x20; "customer\_id": "460000000026049",

&#x20; "invoice\_number": "ETH-0001",

&#x20; "date": "2026-03-25",

&#x20; "due\_date": "2026-03-25",

&#x20; "currency\_code": "EUR",

&#x20; "payment\_terms": 0,

&#x20; "payment\_terms\_label": "Due on Receipt",

&#x20; "is\_inclusive\_tax": false,

&#x20; "line\_items": \[

&#x20;   {

&#x20;     "name": "KAI Premium Subscription — 12 months",

&#x20;     "quantity": 1,

&#x20;     "rate": 99.00

&#x20;   }

&#x20; ],

&#x20; "notes": "Paid via Ethereum (ETH). TX: 0xabc123...def456. Rate: 1 ETH = €2,380.95.",

&#x20; "custom\_fields": \[

&#x20;   { "label": "Cryptocurrency", "value": "ETH" },

&#x20;   { "label": "Crypto Amount", "value": "0.0416 ETH" },

&#x20;   { "label": "Exchange Rate", "value": "1 ETH = €2,380.95" },

&#x20;   { "label": "TX Hash", "value": "0xabc123def456789012345678901234567890abcd" },

&#x20;   { "label": "Blockchain", "value": "Ethereum" },

&#x20;   { "label": "Payment Processor", "value": "PayRam" },

&#x20;   { "label": "Block Confirmations", "value": "12" }

&#x20; ]

}

```



\### Response: Key Fields to Store



```json

{

&#x20; "code": 0,

&#x20; "message": "The invoice has been created.",

&#x20; "invoice": {

&#x20;   "invoice\_id": "460000000079065",

&#x20;   "invoice\_number": "ETH-0001",

&#x20;   "status": "draft",

&#x20;   "total": 99.00,

&#x20;   ...

&#x20; }

}

```



\*\*Store `invoice\_id`\*\* — needed immediately for the payment record (Dataset 3).



\*\*After creation, mark as sent:\*\*  

`POST /invoices/{invoice\_id}/status/sent?organization\_id={org\_id}`  

This moves the invoice from "Draft" to "Sent" status, making it visible in reports.



\---



\## Dataset 3: Customer Payment



\*\*Trigger:\*\* Immediately after invoice creation (same webhook handler, second API call)  

\*\*Endpoint:\*\* `POST https://www.zohoapis.eu/books/v3/customerpayments?organization\_id={org\_id}`  

\*\*OAuth Scope:\*\* `ZohoBooks.customerpayments.CREATE`



\### Webhook Payload → Zoho Payment Mapping



| Source | Zoho API Field | Type | Required | Notes |

|--------|---------------|------|----------|-------|

| Same `contact\_id` | `customer\_id` | string | \*\*YES\*\* | |

| — | `payment\_mode` | string | Recommended | `"Cryptocurrency"` (custom payment mode — Dennis to create) |

| EUR total from invoice | `amount` | double | \*\*YES\*\* | Must match or exceed invoice total |

| Payment confirmation timestamp | `date` | string | \*\*YES\*\* | Format: `YYYY-MM-DD` |

| Bank/cash account for crypto | `account\_id` | string | \*\*YES\*\* | Zoho chart-of-accounts ID for crypto holdings. Dennis to set up. |

| TX hash | `reference\_number` | string | Recommended | Blockchain transaction hash |

| Description | `description` | string | No | e.g. `"ETH on-chain payment — TX 0xabc123..."` |

| Invoice link | `invoices` | array | \*\*YES\*\* | Links payment to specific invoice |

| — | `invoices\[].invoice\_id` | string | \*\*YES\*\* | From Dataset 2 response |

| — | `invoices\[].amount\_applied` | double | \*\*YES\*\* | Amount applied to this invoice |

| Crypto details | `custom\_fields` | array | No | Same crypto metadata as invoice |



\### Example JSON Payload



```json

{

&#x20; "customer\_id": "460000000026049",

&#x20; "payment\_mode": "Cryptocurrency",

&#x20; "amount": 99.00,

&#x20; "date": "2026-03-25",

&#x20; "account\_id": "460000000000361",

&#x20; "reference\_number": "0xabc123def456789012345678901234567890abcd",

&#x20; "description": "ETH on-chain payment — 0.0416 ETH at 1 ETH = €2,380.95",

&#x20; "invoices": \[

&#x20;   {

&#x20;     "invoice\_id": "460000000079065",

&#x20;     "amount\_applied": 99.00

&#x20;   }

&#x20; ],

&#x20; "custom\_fields": \[

&#x20;   { "label": "Cryptocurrency", "value": "ETH" },

&#x20;   { "label": "Crypto Amount", "value": "0.0416 ETH" },

&#x20;   { "label": "TX Hash", "value": "0xabc123def456789012345678901234567890abcd" }

&#x20; ]

}

```



\### Response



```json

{

&#x20; "code": 0,

&#x20; "message": "The payment has been created.",

&#x20; "payment": {

&#x20;   "payment\_id": "460000000079069",

&#x20;   "payment\_number": "1",

&#x20;   "invoice\_numbers": \["ETH-0001"],

&#x20;   ...

&#x20; }

}

```



\---



\## Connector Execution Flow



```

STEP 1 — On KAI Registration:

&#x20; POST /contacts → create customer → store contact\_id in KAI DB



STEP 2 — On Payment Confirmation Webhook:

&#x20; a) Look up contact\_id from KAI DB (by email or KAI user ID)

&#x20; b) POST /invoices → create invoice with BTC-/ETH- prefix → get invoice\_id

&#x20; c) POST /invoices/{invoice\_id}/status/sent → mark as sent

&#x20; d) POST /customerpayments → create payment linked to invoice\_id

&#x20; e) Log success/failure for monitoring



STEP 3 — Error Handling:

&#x20; - If contact not found → create contact first, then proceed

&#x20; - If invoice creation fails → log error, retry with backoff

&#x20; - If payment creation fails → invoice exists but unpaid — alert for manual review

&#x20; - Store all Zoho API responses for audit trail

```



\---



\## Pre-Requisites for Dennis (Zoho Books Admin)



Before @Canaricolor can build and test the connector, Dennis needs to configure:



| # | Task | Details |

|---|------|---------|

| 1 | \*\*Create custom invoice prefixes\*\* | `BTC-` and `ETH-` series. Zoho: Settings → Preferences → Invoice Settings. |

| 2 | \*\*Create custom payment mode\*\* | Name: `"Cryptocurrency"`. Zoho: Settings → Payment Modes. |

| 3 | \*\*Create custom fields on Invoices\*\* | Labels: `Cryptocurrency`, `Crypto Amount`, `Exchange Rate`, `TX Hash`, `Blockchain`, `Payment Processor`, `Block Confirmations`. Zoho: Settings → Preferences → Invoices → Custom Fields. |

| 4 | \*\*Create custom fields on Customer Payments\*\* | Labels: `Cryptocurrency`, `Crypto Amount`, `TX Hash`. |

| 5 | \*\*Create custom fields on Contacts\*\* | Labels: `Codice Fiscale` (if not using native field). |

| 6 | \*\*Create chart-of-accounts entry\*\* | A "Cryptocurrency Holdings" account (type: Bank/Cash or Other Asset) to receive crypto payment credits. |

| 7 | \*\*Register OAuth app\*\* | In Zoho API Console (api-console.zoho.eu): create a Server-based Application. Provide client\_id + client\_secret + refresh\_token to @Canaricolor. |

| 8 | \*\*Provide organization\_id\*\* | From Zoho Books: dropdown → Manage Organizations. |



\---



\## API Reference Links



\- Contacts: https://www.zoho.com/books/api/v3/contacts/

\- Invoices: https://www.zoho.com/books/api/v3/invoices/

\- Customer Payments: https://www.zoho.com/books/api/v3/customer-payments/

\- OAuth setup: https://www.zoho.com/books/api/v3/oauth/

\- EU API console: https://api-console.zoho.eu/



\---



\*Back to \[Zoho Books Integration](10\_Zoho\_Books\_Integration.md) | \[Next Steps](07\_Next\_Steps.md)\*

