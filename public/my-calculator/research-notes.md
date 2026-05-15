# Market History Calculator Research

## Conclusion

The MoneyTrax Market History calculator can be replicated as a browser-based calculator. The live page renders the data and calculations client-side, and the visible UI exposes enough annual return data and behavior to reproduce the core calculator experience.

## Captured Requirements

- Market selector with eleven available series: Dow Jones Industrials, S&P 500 Price, S&P 500 Total Return, S&P TSX Composite, S&P TSX Total Return, Russell 2000, NASDAQ Composite, MSCI World Equity, 10-Year Govt Bonds, 20-Year Muni Bonds, and 30-Year Corp Bonds.
- Start/end year selectors constrained by the selected market's available annual data.
- Optional limits: Floor, Buffer, Cap, Participation, Spread, Fee, and Multi-Year.
- Market Returns table with year, annual return, limited return, $1 investment, and limited $ investment.
- Market Statistics panel comparing Actual and Limited for number of years, average return over period, actual return over period, and ending value of $1 invested.
- Documentation and Source dialogs.

## Verified Default Example

The screenshot scenario is S&P 500 Price, 2000 through 2025, with a 0% floor and 12% cap. The live calculator shows:

- Number of years: 26
- Average ROR: 7.68% actual, 7.40% limited
- Actual ROR over period: 6.10% actual, 7.26% limited
- $1 invested: $4.66 actual, $6.19 limited

The local replica uses those same defaults.

## Calculation Rules

- Average ROR is the arithmetic mean of the displayed annual returns.
- Actual ROR over period is CAGR: ending value raised to `1 / years`, minus 1.
- $1 investment compounds annually from the selected first year through the selected final year.
- Participation applies only to positive returns.
- Cap applies after participation.
- Spread reduces positive credited returns after cap and does not create a negative credited return by itself.
- Buffer applies to negative returns by adding the buffer amount, capped at 0%.
- Floor applies after buffer.
- Fee subtracts from the credited return after the other limits.
- Multi-Year groups rows from the selected start year. Intermediate years show 0%; the limited return is credited only at the end of each complete group. Incomplete final groups receive no credit.

## Source Dialog Text

Historical Market Information was collected from the following sources:

DJIA: 1928-2007 Pinnacle Data (www.pinnacledata.com)
DJIA: 2008+ updated from public sources.
S&P500 Price: 1930-2004 Pinnacle Data (www.pinnacledata.com)
S&P500 Price: 2005+ updated from public sources.
S&P500 Total Return: Standard & Poors. (www.standardandpoors.com)
S&P/TSX: 1946-1979 CSA Performance Reporting Working Group Direction Document dated 6/2/2005. 1979+ updated from public sources.
Russel 2000: www.ftse.com.
NASDAQ Composite: 1979-2007 Pinnacle Data (www.pinnacledata.com)
NASDAQ Composite: 2008+ updated from public sources.
MSCI World Equity: MSCI Inc. (www.msci.com)
10-Year Govt Bonds: FRED series IRLTLT01USM156N.
20-Year Muni Bonds: FRED series MSLB20.
30-Year Corp Bonds: FRED series AAA.
