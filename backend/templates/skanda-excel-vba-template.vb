' SKANDA ENGINEERING - EXCEL VBA MACRO TEMPLATE
' Import/Export data from website LocalStorage
' This VBA code should be added to Excel backend system

' ============= MAIN IMPORT FUNCTION =============
Sub ImportDataFromWebsite()
    ' This function imports data from the JSON export
    ' File should be placed in the backend/data folder
    
    MsgBox "Import data from website" & vbCrLf & _
           "1. Export data from admin dashboard (Settings > Export All Data)" & vbCrLf & _
           "2. Place JSON file in backend/data folder" & vbCrLf & _
           "3. Run this macro to import", vbInformation, "Data Import"
    
    ' TODO: Implement JSON parsing and import logic
    ' Use VBA-JSON library or Windows ScriptingHost for parsing
End Sub

' ============= CUSTOMER SHEET SETUP =============
Sub SetupCustomerSheet()
    Dim ws As Worksheet
    On Error Resume Next
    Set ws = ThisWorkbook.Sheets("Customers")
    On Error GoTo 0
    
    If ws Is Nothing Then
        Set ws = ThisWorkbook.Sheets.Add
        ws.Name = "Customers"
    End If
    
    With ws
        .Range("A1:H1").Value = Array("Customer ID", "Full Name", "Company", "Email", "Phone", "Industry", "Source", "Created Date")
        .Range("A1:H1").Interior.Color = RGB(11, 31, 58)
        .Range("A1:H1").Font.Color = RGB(255, 255, 255)
        .Range("A1:H1").Font.Bold = True
    End With
End Sub

' ============= ORDERS SHEET SETUP =============
Sub SetupOrdersSheet()
    Dim ws As Worksheet
    On Error Resume Next
    Set ws = ThisWorkbook.Sheets("Orders")
    On Error GoTo 0
    
    If ws Is Nothing Then
        Set ws = ThisWorkbook.Sheets.Add
        ws.Name = "Orders"
    End If
    
    With ws
        .Range("A1:I1").Value = Array("Order ID", "Customer ID", "Service Type", "Quantity", "Unit Price", "Amount", "Status", "Due Date", "Created Date")
        .Range("A1:I1").Interior.Color = RGB(11, 31, 58)
        .Range("A1:I1").Font.Color = RGB(255, 255, 255)
        .Range("A1:I1").Font.Bold = True
    End With
End Sub

' ============= INVOICE SHEET SETUP =============
Sub SetupInvoiceSheet()
    Dim ws As Worksheet
    On Error Resume Next
    Set ws = ThisWorkbook.Sheets("Invoices")
    On Error GoTo 0
    
    If ws Is Nothing Then
        Set ws = ThisWorkbook.Sheets.Add
        ws.Name = "Invoices"
    End If
    
    With ws
        .Range("A1:H1").Value = Array("Invoice ID", "Order ID", "Customer Name", "Amount", "GST %", "GST Amount", "Total", "Date")
        .Range("A1:H1").Interior.Color = RGB(11, 31, 58)
        .Range("A1:H1").Font.Color = RGB(255, 255, 255)
        .Range("A1:H1").Font.Bold = True
    End With
End Sub

' ============= CALCULATE INVOICE TOTAL =============
Function CalculateInvoiceTotal(amount As Double, gstPercent As Double) As Double
    Dim gstAmount As Double
    gstAmount = amount * (gstPercent / 100)
    CalculateInvoiceTotal = amount + gstAmount
End Function

' ============= GENERATE REPORT =============
Sub GenerateSalesReport()
    Dim ws As Worksheet, ordersWs As Worksheet
    Dim totalRevenue As Double, completedOrders As Long
    Dim i As Long
    
    Set ordersWs = ThisWorkbook.Sheets("Orders")
    Set ws = ThisWorkbook.Sheets.Add
    ws.Name = "Report_" & Format(Now, "YYYYMMDD")
    
    ws.Range("A1").Value = "SALES REPORT"
    ws.Range("A1").Font.Bold = True
    ws.Range("A1").Font.Size = 14
    
    ws.Range("A3").Value = "Generated: " & Now
    ws.Range("A5").Value = "Total Revenue:"
    ws.Range("A6").Value = "Completed Orders:"
    
    ' Calculate totals from Orders sheet
    For i = 2 To ordersWs.UsedRange.Rows.Count
        If ordersWs.Cells(i, 7).Value = "completed" Then
            totalRevenue = totalRevenue + ordersWs.Cells(i, 6).Value
            completedOrders = completedOrders + 1
        End If
    Next i
    
    ws.Range("B5").Value = totalRevenue
    ws.Range("B5").NumberFormat = "₹#,##0.00"
    ws.Range("B6").Value = completedOrders
    
    MsgBox "Sales report generated on sheet: " & ws.Name
End Sub

' ============= EXPORT TO CSV =============
Sub ExportCustomersToCSV()
    Dim ws As Worksheet, outputFile As String
    Dim i As Long, j As Long
    Dim fso As Object, fileStream As Object
    
    Set ws = ThisWorkbook.Sheets("Customers")
    outputFile = ThisWorkbook.Path & "\Customers_Export_" & Format(Now, "YYYYMMDD_HHMMSS") & ".csv"
    
    Set fso = CreateObject("Scripting.FileSystemObject")
    Set fileStream = fso.CreateTextFile(outputFile, True)
    
    ' Write headers
    For j = 1 To ws.UsedRange.Columns.Count
        fileStream.Write ws.Cells(1, j).Value
        If j < ws.UsedRange.Columns.Count Then fileStream.Write ","
    Next j
    fileStream.WriteLine ""
    
    ' Write data
    For i = 2 To ws.UsedRange.Rows.Count
        For j = 1 To ws.UsedRange.Columns.Count
            fileStream.Write ws.Cells(i, j).Value
            If j < ws.UsedRange.Columns.Count Then fileStream.Write ","
        Next j
        fileStream.WriteLine ""
    Next i
    
    fileStream.Close
    Set fileStream = Nothing
    Set fso = Nothing
    
    MsgBox "Customers exported to: " & outputFile
End Sub

' ============= INITIALIZE WORKBOOK =============
Sub InitializeWorkbook()
    Call SetupCustomerSheet
    Call SetupOrdersSheet
    Call SetupInvoiceSheet
    MsgBox "Workbook sheets initialized successfully!"
End Sub

' Auto-run on workbook open
Private Sub Workbook_Open()
    ' Uncomment below to auto-initialize on open
    ' Call InitializeWorkbook
End Sub
