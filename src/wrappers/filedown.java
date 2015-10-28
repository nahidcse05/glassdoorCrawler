package wrappers;

import java.io.*;
import java.net.*;


public class filedown {
    public static int download(String address, String localFileName) {
        OutputStream out = null;
        HttpURLConnection conn = null;
        InputStream in = null;

        try {
        	
        	//HttpURLConnection httpcon = (HttpURLConnection) url.openConnection(); 
        	
            URL url = new URL(address);
            out = new BufferedOutputStream(new FileOutputStream(localFileName));
            conn = (HttpURLConnection) url.openConnection();
       	    conn.addRequestProperty("User-Agent", "Mozilla/4.76"); 
         
            
            if(conn.getResponseCode()==404 || conn.getResponseCode()==500)
            	return 1;
          
            conn.setConnectTimeout(10000);
            conn.setReadTimeout(10000);
            
           
            in = conn.getInputStream();
            
            byte[] buffer = new byte[1024];

            int numRead;
            long numWritten = 0;

            while ((numRead = in.read(buffer)) != -1) {
                out.write(buffer, 0, numRead);
                numWritten += numRead;
            }

            System.out.println(localFileName);
        } 
        catch (Exception exception) { 
            exception.printStackTrace();
        } 
        finally {
            try {
                if (in != null) {
                    in.close();
                }
                if (out != null) {
                    out.close();
                }
            } 
            catch (IOException ioe) {
            }
        }
        return 0;
    }

    
    public static String extract_filename(String address) {
        int lastSlashIndex = address.lastIndexOf('/');
        if (lastSlashIndex >= 0 &&
        lastSlashIndex < address.length() - 1) {
        	return  address.substring(lastSlashIndex + 1);      
        } 
        else {
            System.err.println("Could not figure out local file name for "+address);
            return null;
        }
		
    }
    
    
    public static String extract_filename_json(String address) {
        int lastSlashIndex = address.lastIndexOf('/');
        if (lastSlashIndex >= 0 &&
        lastSlashIndex < address.length() - 1) {
        	int lastDotIndex = address.lastIndexOf('.');
        	return  address.substring(lastSlashIndex + 1, lastDotIndex);      
        } 
        else {
            System.err.println("Could not figure out local file name for "+address);
            return null;
        }
		
    }
    
    public static int download1(String address, String storeto) {
        int lastSlashIndex = address.lastIndexOf('/');
        if (lastSlashIndex >= 0 &&
        lastSlashIndex < address.length() - 1) {
        //    download(address, storeto+address.substring(lastSlashIndex + 1));
            return download(address, storeto);
            
        } 
        else {
            System.err.println("Could not figure out local file name for "+address);
            return 1;
        }
    }

    
    public static int download2(String address, String storeto) {
        int lastSlashIndex = address.lastIndexOf('/');
        if (lastSlashIndex >= 0 &&
        lastSlashIndex < address.length() - 1) {
            return download(address, storeto+address.substring(lastSlashIndex + 1));
           
            
        } 
        else {
            System.err.println("Could not figure out local file name for "+address);
            return 1;
        }
    }
    
    public static void main(String[] args) {
    	
    	
    	//download("http://ehealthforum.com/health/depression_medical_questions_25_0_25.html");
        /*for (int i = 0; i < args.length; i++) {
            download(args[i]);
        }*/
    }
}

