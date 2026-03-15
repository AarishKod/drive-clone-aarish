"use client"

import { useState } from "react"
import { mockFiles } from "../lib/mock-data"
import { Folder, FileIcon, Upload, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "~/components/ui/button"

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)

  const getCurrentFiles = () => {
    return mockFiles.filter((file) => file.parent === currentFolder)
  }

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId)
  }

  const getBreadcrumbs = () => {
    const breadcrumbs = []
    let currentId = currentFolder

    while (currentId !== null) {
      const folder = mockFiles.find((file) => file.id === currentId)
      if (folder) {
        breadcrumbs.unshift(folder)
        currentId = folder.parent
      } else {
        break
      }
    }

    return breadcrumbs
  }

  const handleUpload = () => {
    alert("Upload functionality would be implemented here")
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button
              onClick={() => setCurrentFolder(null)}
              variant="ghost"
              className="text-foreground hover:bg-muted px-2"
            >
              My Drive
            </Button>
            {getBreadcrumbs().map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-1 text-muted-foreground" size={16} />
                <Button
                  onClick={() => handleFolderClick(folder.id)}
                  variant="ghost"
                  className="text-foreground hover:bg-muted px-2"
                >
                  {folder.name}
                </Button>
              </div>
            ))}
          </div>
          <Button onClick={handleUpload} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Upload className="mr-2" size={18} />
            Upload
          </Button>
        </div>

        {/* File List */}
        <div className="bg-card rounded-lg border border-border">
          <div className="px-6 py-3 border-b border-border">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>
          <ul>
            {getCurrentFiles().map((file) => (
              <li
                key={file.id}
                className="px-6 py-3 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex items-center">
                    {file.type === "folder" ? (
                      <button
                        onClick={() => handleFolderClick(file.id)}
                        className="flex items-center text-foreground hover:text-primary transition-colors"
                      >
                        <Folder className="mr-3 text-muted-foreground" size={20} />
                        {file.name}
                      </button>
                    ) : (
                      <Link
                        href={file.url || "#"}
                        className="flex items-center text-foreground hover:text-primary transition-colors"
                      >
                        <FileIcon className="mr-3 text-muted-foreground" size={20} />
                        {file.name}
                      </Link>
                    )}
                  </div>
                  <div className="col-span-3 text-muted-foreground text-sm">
                    {file.type === "folder" ? "Folder" : "File"}
                  </div>
                  <div className="col-span-3 text-muted-foreground text-sm">
                    {file.type === "folder" ? "--" : "2 MB"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
